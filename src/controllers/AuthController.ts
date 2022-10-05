import { Request, Response, Router, Application } from "express";
import DatabaseConnection from '../database/DatabaseConnection';
import Usuario from '../models/entities/Usuario';

interface RegistroRequestBody {
    usuario: string;
    password: string;
    nombreCompleto: string;
}

interface IniciarSesionRequestBody {
    usuario: string;
    password: string;
}

//contiene y recibe los métodos que maneja las peticiones
export default class AuthController {
    private router: Router;

    private constructor(app: Application) {
        // router: conjunto de rutas
        this.router = Router();
        this.initializeRouter();
        app.use('/auth', this.router);
    }

    private initializeRouter(): void {
        this.router.post('/registro', this.registro);
        this.router.post('/inicioSesion', this.inicioSesion);
    }

    private async registro(req: Request, res: Response): Promise<void>{
        try {
            //petición
            const {
                usuario,
                password,
                nombreCompleto
            } = <RegistroRequestBody>req.body;

            if (!usuario || !password || !nombreCompleto) {
                res.status(400).end();
                return;
            }
            //nueva entidad
            const repositorioUsuarios = await DatabaseConnection.getRepository(Usuario);

            const nuevoUsuario = new Usuario();

            nuevoUsuario.usuario = usuario;
            nuevoUsuario.password = password;
            nuevoUsuario.nombreCompleto = nombreCompleto;
            nuevoUsuario.fechaCreacion = new Date();
            nuevoUsuario.fechaActualizacion = new Date();

            repositorioUsuarios.save(nuevoUsuario);

            res.status(200).json(nuevoUsuario);
        } catch (e) {
            console.error(e);
            res.status(500).end();
        }
    }

    private async inicioSesion(req: Request, res: Response): Promise<void>{
        try {
            const {
                usuario,
                password
            } = <IniciarSesionRequestBody>req.body;

            if (!usuario || !password) {
                res.status(400).end();
                return;
            }

            const inicio = await DatabaseConnection.getRepository(Usuario);

            const login = await inicio.findOneBy({ usuario, password });

            if(login) {
                res.status(200).json(login);
            }
            else {
                res.status(401).end();  //end(): respuesta sin body
            }
        } catch (e) {
            console.error(e);
            res.status(500).end();
        }
    }

    public static mount(app: Application): AuthController {
        return new AuthController(app);
    }
}