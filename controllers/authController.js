const { loginUserService, signupUserService } = require('../services/userService')

/**
 * @function loginUser to login user account and generate token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: true, msg: 'data is missing' });
    }
    const { statusCode, response } = await loginUserService(req.body);
    return res.status(statusCode).send(response);
}

/**
 * @function createAccount to create user account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createAccount = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: true, msg: 'data is missing' });
    }
    const { statusCode, response } = await signupUserService(req.body);
    return res.status(statusCode).send(response);
}


module.exports = {
    loginUser,
    createAccount
}