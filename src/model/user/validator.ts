import * as Joi from 'joi';

export const createUserValidator = Joi.object().keys({
    email: Joi.string().email().required().error(new Error(('invalid email'))),
    password: Joi.string().min(8).max(20).required().error(new Error('password length must be between 8 to 20'))
});