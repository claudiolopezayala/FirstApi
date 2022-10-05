export default class Saludo {
    private nombre: string;
    private edad: number;

    public constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public saludar(): string{
        return `Hola ${this.nombre}, tienes ${this.edad} años`;
    }
}
// export default Saludo;
