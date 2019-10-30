const express = require('express');
const server = express();
require('./services/passport.js');
require('./routes/authRoutes.js')(server);


const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`server running on port ${port}`);
})