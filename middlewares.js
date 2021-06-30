const handlerNotFound = (req, res, next) => {
    res.status(200).json({ok: false, error: "No existe el recurso"});
}

exports.handlerNotFound = handlerNotFound;