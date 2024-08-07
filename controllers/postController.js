const { getPostListService, addPostService } = require('../services/postService')

/**
 * @function to ask question from AI
 * @param {*} req 
 * @param {*} res 
 * @returns response
 */
const addPost = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: true, msg: 'data is missing' });
    }
    const { statusCode, response } = await addPostService(req.userId, req.body);
    return res.status(statusCode).send(response);
}

/**
 * @function to retrive the asked question result from our database 
 * @param {*} req 
 * @param {*} res 
 * @returns respone
 */
const getListofPost = async (req, res) => {
    const authorId = req.query.authorId;
    const { statusCode, response } = await getPostListService(authorId);
    return res.status(statusCode).send(response);
}

module.exports = {
    addPost,
    getListofPost
}