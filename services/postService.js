

const db = require('../sequelize/models/index.js')
const { Op } = require('sequelize');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
var _ = require('lodash');
const schemaUtils = require('../Utils/validateSchema.js')

const getPostListService = async (authorId) => {
    try {
       let ListofBlogs = []
        if (authorId)
            ListofBlogs = await db.Post.findAll({
                include: [{
                    model: db.User,
                    attributes: ['name'],
                }],
                where: {
                    authorId
                },

                raw: true
            })

        else ListofBlogs = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['name'],
            }], raw: true
        })
       
        console.log('ListofBlogs is ', ListofBlogs);

        return {
            statusCode: 200,
            response: { data: ListofBlogs, error: false }
        }
    } catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}
const addPostService = async (userId, body) => {
    try {
        const { error } = schemaUtils.ValidatePostSchema({ ...body });
        if (error) {
            return {
                statusCode: 200,
                response: { data: error.details[0].message, error: false }
            }
        }
        const { title, content } = body;
        const dbResponse = await db.Post.create({
            id: uuidv4(), title, content, authorId: userId
        });
        return {
            statusCode: 200,
            response: { data: { msg: 'blog posted successfully', error: false } }
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
module.exports = {
    getPostListService,
    addPostService
}