require('dotenv').config();
const server = require('./server.js');
require('./services/passport.js');
require('./routes/authRoutes.js')(server);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`server running on port ${port}`);
})