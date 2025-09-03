import type { User, UserResponseDTO, CreateUserRequestDTO } from "../models/User.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
    
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    getAllUsers(): UserResponseDTO[]{
        return this.userRepository.findAll();
    }

    getById(id: number): UserResponseDTO | null {
        return this.userRepository.findById(id);
    }

    createUser(userData: CreateUserRequestDTO): UserResponseDTO {
        return this.userRepository.create(userData);
    }
}