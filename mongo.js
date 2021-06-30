const mongoose = require('mongoose');

const {connect} = mongoose;

const conectarBD = async () => {
    connect(process.env.DB_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
    });
}

conectarBD()
.then(result => {
    console.log("DB Conectada");
})
.catch(err => {
    console.log(err);
});