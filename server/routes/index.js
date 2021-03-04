const router = require('express').Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use(authenticate);
router.get('/berita', UserController.getBerita); // contoh authenticate // pas hit harus ada access_token di req.headers

module.exports = router;