if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const router = require('./routes/index');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => console.log(`This app is running on http://localhost:${PORT}`))

