
const db = require('../sequelize/models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
var _ = require('lodash');
const schemaUtils = require('../Utils/validateSchema.js')

const signupUserService = async (body) => {
    try {
        console.log('body is ', body);
        const { error } = schemaUtils.ValidateUserSchema({ ...body });
        if (error) {
            return { response: { msg: error.details[0].message, error: true }, statusCode: 400 };
        }
        const { email, password, name } = body;
        // check account exist or not.
        const dbData = await db.User.findOne({ where: { email } });
        if (dbData) {
            return {
                statusCode: 200,
                response: { msg: `Account already exist, please try logging in`, error: true }
            }

        }
        const hashPassword = await bcrypt.hash(password, 10);
        console.log('bcrypt pwd is ', hashPassword)
        const dbResponse = await db.User.create({
            id: uuidv4(), email, passwordHash: hashPassword, name: name
        });
        const token = jwt.sign({ id: dbResponse.dataValues.id, email: dbResponse.dataValues.email }, 'SWADESAI-SECRET', { expiresIn: '28d' });
        return {
            statusCode: 200,
            response: { msg: 'Logged In successfully', error: false, data: {token, id: dbResponse.dataValues.id,email: dbResponse.dataValues.email }  }
        }


    }
    catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

const loginUserService = async (body) => {
    try {
        console.log('body is ', body);
        const { error } = schemaUtils.ValidateLoginSchema({ ...body });
        if (error) {
            return { response: { msg: error.details[0].message, error: true }, statusCode: 400 };
        }
        const { email, password } = body;
        const dbData = await db.User.findOne({ where: { email } });
        if (!dbData) {
            return {
                statusCode: 200,
                response: { msg: `Account doesn't exist, please try create one`, error: true }
            }
        }
        console.log('dbData is ', dbData);
        // authenciate password
        const isAuthTrue = await bcrypt.compare(password, dbData.dataValues.passwordHash);
        console.log('isAuthTrue is ', isAuthTrue);
        if (dbData && isAuthTrue) {
            // password is correct, send jwt token to the client
            const token = jwt.sign({ id: dbData.dataValues.id, email: dbData.dataValues.email }, 'SWADESAI-SECRET', { expiresIn: '28d' });
            return {
                statusCode: 200,
                response: { msg: 'Logged In successfully', error: false, data: {token, id: dbData.dataValues.id,email: dbData.dataValues.email }  }
            }
        } else {
            return {
                statusCode: 400,
                response: { msg: 'Wrong Password', error: true }
            }
        }
    } catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

module.exports = {
    signupUserService,
    loginUserService
}