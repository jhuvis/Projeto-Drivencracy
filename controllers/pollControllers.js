import mongo from '../db/db.js';

let db = await mongo();

export async function getpoll (req, res){
    try {
        await db.collection("poll").find().toArray().then(polls => {
            return res.status(201).send(polls);
        });
    } catch (error) {
        console.log(error);
       res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function postpoll(req, res){
    const trintadias = 2592000000;
    try {
        let poll = req.body;
        console.log(poll.expireAt);
        console.log(poll.title);
        if(!poll.expireAt)
        {
            let dia = new Date(Date.now() + trintadias);
            poll = 
                {
                    title: poll.title,
                    expireAt: dia.format('YYYY-MM-DD HH:mm')
                };

            await db.collection("poll").insertOne({poll});
        }
        else
        {
            poll = 
                {
                    title: poll.title,
                    expireAt: poll.expireAt
                }

            await db.collection("poll").insertOne({poll});
        }

        return res.status(201).send(poll);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};