const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        //con esto accesamos al header, con el split es para quitar el espacio entre Bearer y token
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        // El token lo pasamos para ser verificado
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
        next();
    } catch(error){
        return res.status(401).json({
            message: "Auth failed"
        })
    }
}