import { type Request, type Response } from "express";
import { UserService } from "../services/UserService.js";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getAllUsers = (req: Request, res: Response): void => {
        try{
            const users = this.userService.getAllUsers();
            res.status(200).json({data: users})
        }catch (error){
            res.status(500).json({message: "Erro interno do servidor!"})
        }
    }

    getUserByid = (req: Request, res: Response): void => {
        try{
            const { id } = req.params;

            if (!id) {
                res.status(400).json({message: "ID do usuário não informado!"});
                return;
            }

            const numericId = parseInt(id);

            if (isNaN(numericId)) {
                res.status(400).json({message: "ID do usuário deve ser um número!"});
                return;
            }

            const user = this.userService.getById(numericId);

            if (!user) {
                res.status(404).json({message: `Usuário com id ${numericId} não encontrado!`})
            }

            res.json({data: user});
        } catch (error) {
             res.status(500).json({message: "Erro interno do servidor!"})
        }
    }

    createUser = (req: Request, res: Response): void => {
        try{
            const {firstName, lastName, email, password} = req.body;

            if (!firstName || !lastName || !email || !password){
                res.status(400).json({ success: false, message: 'Nome e email são obrigatórios' });
                return;
            }

            const user = this.userService.createUser({firstName, lastName, email, password});
            res.status(201).json({data: user});
        } catch (error) {
            res.status(500).json({message: "Erro interno do servidor!"})
        }
    }
}