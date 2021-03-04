const router = require('express').Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use(authenticate);
router.get('/something', UserController.test); // ontoh authenticate

module.exports = router;