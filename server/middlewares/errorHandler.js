const errorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        let errors = []
        err.errors.forEach(el => {
            errors.push(el.message)
        });
        res.status(400).json({
            message: err.message,
            details: errors
        })
    }
    else if (err.name === '401') {
        res.status(err.name).json({ message: 'Unauthorized' })
    }
    else if (err.name === '404') {
        res.status(404).json({ message: 'Not Found' })
    }
    else {
        res.status(500).json({ err: err.message })
    }
}

module.exports = errorHandler