export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserRow {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Lembre-se que o password também vem do banco
    created_at: string; // SQLite retorna string
    updated_at: string; // SQLite retorna string
}

export interface CreateUserRequestDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

export interface UserResponseDTO{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}