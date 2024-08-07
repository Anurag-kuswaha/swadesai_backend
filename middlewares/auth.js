
// verify user Access Token and set the username and userType  
const jwt = require('jsonwebtoken');
exports.verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization !== "undefined") {
    const token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, 'SWADESAI-SECRET');
      console.log('decode is ', decoded);
      if (decoded == 'null') {
        return res.status(401).send('Incorrect authorization token');
      } else {
        req.email = decoded.email;
        req.userId = decoded.id
      }
    }
    catch (e) {
      return res.status(401).send('Incorrect authorization token');
    }
  } else {
    return res.status(401).send('bearer token is required');
  }
  next();
};
