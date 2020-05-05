const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:8080'
// };

// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('common'));

require('./router/router.js')(app);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//     res.json({ message: "Welcome" })
// })

// const db = require('./app/db.js');
// const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync with { force:true }');
//     initial();
// })

const server = app.listen(8080, "127.0.0.1", function() {
    const host = server.address().address;
    const port = server.address().port
    console.log('App listening at http://%s:%s', host, port);
});

// function initial() {
//     Role.create({
//         id: 1,
//         name: "USER"
//     });
//     Role.create({
//         id: 2,
//         name: "ADMIN"
//     });
//     Role.create({
//         id: 3,
//         name: "PM"
//     });
// }