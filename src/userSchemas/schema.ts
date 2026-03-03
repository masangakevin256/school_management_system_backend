import Joi from "joi";
import { create } from "node:domain";


export const studentSchema =  (input: any) => {
    const schema = Joi.object({
        regNo: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        createAt: Joi.date().optional(),
        updateAt: Joi.date().optional()
    })

    return schema.validate(input)
}