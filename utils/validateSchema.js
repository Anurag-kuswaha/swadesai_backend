
const Joi = require("joi");
/**
 *@function ValidateUserSchema: used for validation of the user Registration Schema
 */
const ValidateUserSchema = (user) => {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return userSchema.validate(user);

};

/**
 *@function ValidateLoginSchema: used for validation of the user loggedin schema
 */
const ValidateLoginSchema = (user) => {
    const LoginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return LoginSchema.validate(user);
};


/**
 *@function ValidatePostSchema: used for validation of the user blog post Schema
 */
 const ValidatePostSchema = (post) => {
    const postSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
    });
    return postSchema.validate(post);

};
module.exports = {
    ValidateUserSchema,
    ValidateLoginSchema,
    ValidatePostSchema
}