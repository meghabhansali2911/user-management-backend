const Joi = require('joi');
const roleEnum = require('../../utility/roleEnum');

const createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp('(?=.*[A-Z])(?=.*[0-9])')).required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    role: Joi.string().valid(...Object.values(roleEnum)).required()
});


const addStudentSchema = Joi.object({
    user_name: Joi.string().required(),
    phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    email: Joi.string().email().required()
});

const editStudentSchema = Joi.object({
    user_name: Joi.string().required(),
    userId: Joi.string().required(),
    phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    email: Joi.string().email().required()
});

const signInUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const editUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required()
});


module.exports = { createUserSchema, addStudentSchema, editStudentSchema, signInUserSchema, editUserSchema };
