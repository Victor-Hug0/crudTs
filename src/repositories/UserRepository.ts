import Database from "better-sqlite3";
import DatabeseConnection  from "../database/connection.js";
import { type User, type CreateUserRequestDTO, type UserResponseDTO, type UserRow } from "../models/User.js";

export class UserRepository {
    private db: Database.Database

    constructor(){
        this.db = DatabeseConnection.getInstance();
    }

    findAll(): UserResponseDTO[] {
        const query = this.db.prepare("SELECT * FROM users ORDER BY created_at DESC");
        const dbUsers = query.all() as UserRow[];

        const users = dbUsers.map(user => this.mapUser(user))
        return users;
    }

    findById(id: number): UserResponseDTO | null {
        const query = this.db.prepare("SELECT * FROM users WHERE id = ?")
        const user = query.get(id) as UserRow;

        return user ? this.mapUser(user) : null;
    }

    create(userData: CreateUserRequestDTO) : UserResponseDTO {
        console.log("passou aqui")
        const query = this.db.prepare("INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)")
            .run(userData.firstName, userData.lastName, userData.email, userData.password)

        const newUser = this.findById(query.lastInsertRowid as number);

        if (!newUser) {
            throw new Error("Falha ao criar o usuário: não foi possível recuperar o registro após a inserção.");
        }

        return newUser;
    }

    private mapUser(dbUser: UserRow): UserResponseDTO {
        return {
          id: dbUser.id,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          email: dbUser.email,
          createdAt: new Date(dbUser.created_at),
          updatedAt: new Date(dbUser.updated_at)
        }
    }
}