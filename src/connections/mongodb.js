const mongoose = require("mongoose");
const CONSTANT = require("../utility/constant");
const URL = CONSTANT.DB_URL;

mongoose.set('strictQuery', false);
mongoose.connect(URL, {
    'useUnifiedTopology': true,
})
    .then(() => {
        console.log("---mongodb connection successfully---");
    }).catch((error) => {
        console.log("---DB Connection ERROR--", error);
    });

function cleanup() {
    mongoose.connection.close(function () {
        console.log('Mongoose connection closed.');
        process.exit(0);
    });
}

process.on('SIGINT', cleanup)
process.on('exit', cleanup)
process.on('SIGTERM', cleanup);
