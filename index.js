
require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');

const Persona = require('./models/Cocinero');
const Cocinero = require('./models/Cocinero');
const { handlerNotFound } = require('./middlewares');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//Buscar Cocinero
app.get("/api/cocineros/:id", (req, res) => {
    const id = req.params.id;

    Cocinero.findById(id)
    .then(cocinero => {
        if(cocinero){
            res.json(cocinero);
        }
        res.status(404).end();
    })
    .catch(err => {
        res.status(400).send(err);
    })
});


//Agregar cocinero
app.post('/api/cocineros', (req, res) => {
    const {nombre, especialidad} = req.body;

    if(nombre && especialidad) {

        const nuevoCocinero = new Cocinero({
            nombre,
            especialidad
        });

        nuevoCocinero.save()
        .then(cocinero => {
            res.json(cocinero);
        })
        .catch(err => {
            res.status(500).send({error: "Internal server error"});
        });
    } else {
        res.status(400).send({error: "Parámetros inválidos"});
    }
});

//Not found
app.use(handlerNotFound);