/**
 * @name: router.js
 * @description: defined all the endpoints (URIs) respond to client requests
 */

const router = require("express").Router();
const authController = require('./controllers/authController.js');
const postController = require('./controllers/postController.js');
const { verifyToken } = require('./middlewares/auth');
// route for  login  
router.post("/login", authController.loginUser);

// route for account level signup 
router.post("/signup", authController.createAccount);

router.post("/post",verifyToken,  postController.addPost); // with auth

router.get("/posts", postController.getListofPost); // without auth


router.use("/healthcheck", (req, res) => {
  res.status(200).send("Server is up and running!");
});

module.exports = router;