const jwt = require('jsonwebtoken');
const secretKey = 'shh'

const generateToken = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = {
    generateToken,
    verifyToken
}