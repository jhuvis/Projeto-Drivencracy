
import DateExtension from '@joi/date';
import JoiImport from 'joi';


export default async function pollMid(req, res, next) {
    const joi = JoiImport.extend(DateExtension);
    const userSchema = joi.object({
        title: joi.string().required(),
        expireAt: joi.date().format('YYYY-MM-DD HH:mm'),
    
    });
    const validation = userSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        return res.status(422).send('Digite os seus dados corretamente!');
    }
    next();
}