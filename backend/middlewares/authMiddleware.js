const jwt = require("jsonwebtoken");
const {User}  = require("../models")

module.exports =  async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, "secretkey");
            req.user = await User.findByPk(decoded.id);
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({
                message: error.message ? error.message : "Not authorised, token failed !"
            })
        }
    }

    if (!token) {
        res.status(401).json({
            message:  "Not Authorized. No token provided.!"
        })
    }
}
