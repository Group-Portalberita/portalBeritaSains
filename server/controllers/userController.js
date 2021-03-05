const { User } = require('../models');
const { comparePassword } = require('../helpers/password-helper');
const { generateToken } = require('../helpers/jwt-helper');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
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
        const apikey = process.env.API_KEY_NEWS
        let q = 'astronomy' // yang di cari
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

    static getImageApod(req, res, next) {
        const apikey = process.env.API_KEY_APOD

        axios({
            method: 'get',
            url: `https://api.nasa.gov/planetary/apod?api_key=${apikey}&count=4`
        })
            .then(response => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    static getWeather(req, res, next) {
        const apikey = process.env.API_KEY_WEATHER
        let city = `Jakarta`
        axios({
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
        })
            .then(response => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }


    static loginGoogle(req, res, next) {
        const googleclientID = process.env.GOOGLE_CLIENT
        const client = new OAuth2Client(googleclientID)
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: googleclientID
            });

            const googleUserParams = ticket.getPayload();
            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults: {
                    email: googleUserParams.email,
                    password: (new Date()).toDateString()
                }
            })
                .then(user => {
                    let payload = { id: user[0].id, email: user[0].email }
                    const access_token = generateToken(payload)
                    res.status(200).json({ access_token })
                })
        }
        verify().catch(console.error);
    }

}

module.exports = UserController;