const nijePronaden = (req, res, next) => {
    const error = new Error(`Nije pronađen - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "ne" : error.stack,
    });
};

module.exports = {
    nijePronaden,
    errorHandler,
};