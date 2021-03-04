const { User } = require('../models');
const { comparePassword } = require('../helpers/password-helper');
const { generateToken } = require('../helpers/jwt-helper');
const axios = require('axios');
class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({ name, email, password })
            .then(user => {
                res.status(201).json({ success: true, message: 'user created', user })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    //Compare sync password // Bandingin antara hash pasword dan password dari db
                    const comparedPassword = comparePassword(password, user.password)
                    if (comparedPassword) {
                        //Generate JWT
                        const access_token = generateToken({ id: user.id, email: user.email })
                        res.status(200).json({ access_token })
                    } else {
                        next(err)
                    }
                } else {
                    next(err)
                }
            })
            .catch(err => {
                next({
                    name: '500',
                    message: 'Invalid email or password'
                })
            })
    }

    static getBerita(req, res, next) {
        let apikey = 'a9ab5977972c43bcb109e814e0f95fa9' // harusnya ditaro di .env
        let q = 'space' // yang di cari
        let date = '2021-03-04' //tanggal mulai dicari
        let sortBy = 'popularity' // di urutkan berdasar
        axios({
            method: 'get',
            url: `https://newsapi.org/v2/everything?q=${q}&from=${date}&sortBy=${sortBy}&apiKey=${apikey}`
        })
            .then(response => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

}

module.exports = UserController;