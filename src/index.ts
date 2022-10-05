// import Saludo from './models/Saludo';

// // function saluda(nombre: string, edad: number): string {
// //     return `Hola ${nombre}, tienes ${edad} años`;
// // }

// const nombre = process.argv[2];
// const edad = parseInt(process.argv[3]);

// const saludo = new Saludo(nombre, edad);

// // const saludo = saluda(nombre, edad);

// console.log(saludo.saludar());

import app from './app';
import 'reflect-metadata';

app.listen(3000, () => {
    console.log('app listening on port 3000');
});


