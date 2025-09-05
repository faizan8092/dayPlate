
module.exports = function logger(req, res, next) {
    console.log(`${req.method} and url is ${req.originalUrl}`)
    next()
}