// jwt is used to validate provided token
//model is used to find the user once the token is validated
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'hshshs')
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
        
        if (!user) {
            console.log("tidak ada user")
            throw new Error()
        }   

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth;
