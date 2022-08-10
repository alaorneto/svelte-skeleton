import bcrypt from 'bcrypt';
import { Request } from 'express';
import { IUser, User } from '../models/authModels.js';
import { UserRepository } from '../repositories/authRepositories.js';

const _repository = new UserRepository(User);

export async function verify_local(username: string, password: string, callback: Function) {
    try {
        let user = await _repository.findByUsername(username);
        
        if (user) {
            let compare = await bcrypt.compare(password, user.password.toString());

            if (compare) {
                return callback(null, user);
            } else {
                return callback(null, false, {message: "Usuário e/ou senha inválidos."});
            }
        } else {
            return callback(null, false, {message: "Usuário e/ou senha inválidos."});
        }
    } catch (err) {
        return callback(null, false, {message: err});
    }
}

export async function register_local(username: string, email: string, password: string) {
    let hash = bcrypt.hashSync(password, 2);
    
    try {
        await _repository.create({username: username, email: email, password: hash});
        return {message: "Usuário criado com sucesso."};
    } catch (err) {
        throw new Error("Erro ao tentar criar usuário.");
    }
}

export function cookie_extractor (req: Request) {
    var token = null;
    
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};