import express, { Application } from 'express';
import bodyParser from 'body-parser';
import PostSaludoRequest from './request-types/PostSaludoRequest';
import Saludo from './models/Saludo';
import AuthController from './controllers/AuthController';
import CocheController from './controllers/CocheController';

const app: Application = express();

app.use(bodyParser.json());

CocheController.mount(app);
// new AuthController(app);

export default app;

/*
    // // http://localhost:3000/saludo
    // app.get('/saludo', (req, res) => {
    //     const saludo = 'Hello world';
    //     res.status(200).json({ saludo });
    // });

    // app.get('/saludo/:nombre', (req, res) => {
    //     const nombre = req.params.nombre;
    //     const saludo = `Hola ${nombre}`;
    //     res.status(200).json({ saludo });
    // });

    // // POST /saludo HTTP/1.1
    // // Host: localhost: 3000
    // // Content-Type: application/json

    // // {
    // //     "nombre": "Pablo"
    // //     "edad": 19
    // // }

    // app.post('/saludo', (req, res) => {
    //     const { nombre, edad } = <PostSaludoRequest>req.body;
    //     const saludo = new Saludo(nombre, edad);
    //     res.status(200).json({ saludo: saludo.saludar() })
    // })
*/