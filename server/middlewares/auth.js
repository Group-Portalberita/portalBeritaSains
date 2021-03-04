const { verifyToken } = require('../helpers/jwt-helper')
const { User } = require('../models');

const authenticate = (req, res, next) => {
    try {
        let { id, email } = verifyToken(req.headers.access_token)
        User.findOne({
            where: { id, email }
        })
            .then(user => {
                // console.log(req.loggedUser);
                req.loggedUser = { id: user.id, email: user.email }
                next()
            })
            .catch(err => {
                next({
                    name: '401'
                })
            })
    } catch (error) {
        next({
            name: '401'
        })
    }
}

//authorize belum

module.exports = {
    authenticate
    // authorize
}