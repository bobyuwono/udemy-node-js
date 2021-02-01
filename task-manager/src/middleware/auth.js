// jwt is used to validate provided token
//model is used to find the user once the token is validated
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');
const User = require('../models/user');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log('tokennya adalah', token)
        const decoded = jwt.verify(token, 'hshshs')
        console.log('decoded id nya adalah adalah', decoded.id)
        const user = await User.findOne({
            _id: decoded.id, 'tokens.token':token}
            )
        console.log('user idnya adalah', user._id);
        
        if (!user) {
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
