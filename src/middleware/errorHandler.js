// centralized error handling

const errorHandling = (err, req, res, next) =>{
    res.status(500).json({
        status: 500,
        message: "Somtheing went wrong!",
        error: err.message
    });
};

export default errorHandling;