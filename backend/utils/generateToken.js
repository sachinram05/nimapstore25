// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken")

module.exports =  (id) => {
    return jwt.sign({ id }, "secretkey", {
        expiresIn: '1h',  //1hour
    });
};

