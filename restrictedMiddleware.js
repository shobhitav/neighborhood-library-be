const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
     if(tokenHeader) {
         
             jwt.verify(tokenHeader, process.env.JWTSECRET, (err, decodedToken) => {
                 if (err) {
                     res.status(401).json({message: "you shall not pass"});
                 } else {
                     req.decodedJwt = decodedToken;
                     next()
                 }
             })
         }
     else {
         res.status(401).json({message: "missing header, you shall not pass"})
     }
}