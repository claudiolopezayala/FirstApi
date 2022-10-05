import { Request, Response, Router, Application } from "express";
import DatabaseConnection from '../database/DatabaseConnection';
import Coche from "../models/entities/Coche";

interface RequestBody {
    marca: string;
    modelo: string;
}

export default class CocheController {
    private router: Router;

    private constructor(app: Application) {
        this.router = Router();
        this.initializeRouter();
        app.use('/coches', this.router);
    }

    private initializeRouter(): void {
        this.router.get('/', this.coches);
        this.router.get('/:id', this.consultar);
        this.router.post('/', this.registro);
        this.router.put('/:id', this.actualizar);
        this.router.delete('/:id', this.borrar);
    }

    private async coches (req: Request, res: Response): Promise<void> {
        const { marca, modelo } = <RequestBody>req.body;

        const reposCoches = await DatabaseConnection.getRepository(Coche);

        const listaCoches = await reposCoches.findBy({ marca, modelo });

        res.status(200).json(listaCoches);
    }

    private async consultar (req:Request, res: Response): Promise<void> {
        const id  = parseInt(req.params.id);

        if (!id) {
            res.status(400).end();
            return;
        }

        const reposCoches = await DatabaseConnection.getRepository(Coche);
            
        const coche = await reposCoches.findOneBy({ id });

        if(coche) {
            res.status(200).json(coche);
        }
        else {
            res.status(404).end();
        }
    }

    private async actualizar (req: Request, res: Response): Promise<void> {
        try {
            const id  = parseInt(req.params.id);

            const { marca, modelo } = <RequestBody>req.body;

            if (!id || !marca || !modelo) {
                res.status(400).end();
                return;
            }

            const reposCoches = await DatabaseConnection.getRepository(Coche);

            const coche = await reposCoches.findOneBy({id});

            if(!coche){
                res.status(409).end();
                return;
            }

            coche.marca = marca;
            coche.modelo = modelo;

            await reposCoches.save(coche);

            res.status(200).json(coche);

        } catch (e) {
            console.error(e);
            res.status(500).end();
        }
    }

    private async registro (req: Request, res: Response): Promise<void> {
        try {
            const { marca, modelo } = <RequestBody>req.body;

            if (!marca || !modelo) {
                res.status(400).end();
                return;
            }

            const reposCoches = await DatabaseConnection.getRepository(Coche);

            const coche = await reposCoches.findOneBy({ marca, modelo });

            if(coche) {
                res.status(409).end();
                return;
            }

            const nuevoCoche = new Coche();

            nuevoCoche.marca = marca;
            nuevoCoche.modelo = modelo;

            await reposCoches.save(nuevoCoche);

            res.status(200).json(nuevoCoche);

        } catch (e) {
            console.error(e);
            res.status(500).end();
        }
    }

    private async borrar (req: Request, res: Response): Promise<void> {
        const id  = parseInt(req.params.id);

        const reposCoches = await DatabaseConnection.getRepository(Coche);

        // const existe = await reposCoches.findOneBy({id});

        // if(!existe) {
        //     res.status(404).end();
        //     return;
        // }
        reposCoches.delete(id);

        res.status(200).end();
    }

    public static mount(app: Application): CocheController {
        return new CocheController(app);
    }
}