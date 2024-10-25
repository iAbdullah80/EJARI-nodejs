const basic_Auth=require('basic-auth');

const USER_CREDENTIALS = {
    username:'ejari',
    password:'ejari123'
};

const authenticate = (req, res, next) => {
    const credentials=basic_Auth(req);

    if (!credentials || 
        credentials.name !== USER_CREDENTIALS.username || 
        credentials.pass !== USER_CREDENTIALS.password) {
        
        res.setHeader('WWW-Authenticate', 'Basic realm=protected route"');
        return res.status(401).json({ message: 'Access denied' });
    }

    next();
};

module.exports = authenticate;