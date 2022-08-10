import bcrypt from 'bcrypt';
import { User } from '../models/authModels.js';
import { UserRepository } from '../repositories/authRepositories.js';
const _repository = new UserRepository(User);
export async function verify_local(username, password, callback) {
    try {
        let user = await _repository.findByUsername(username);
        if (user) {
            let compare = await bcrypt.compare(password, user.password.toString());
            if (compare) {
                return callback(null, user);
            }
            else {
                return callback(null, false, { message: "Usuário e/ou senha inválidos." });
            }
        }
        else {
            return callback(null, false, { message: "Usuário e/ou senha inválidos." });
        }
    }
    catch (err) {
        return callback(null, false, { message: err });
    }
}
export async function register_local(username, email, password) {
    let hash = bcrypt.hashSync(password, 2);
    try {
        await _repository.create({ username: username, email: email, password: hash });
        return { message: "Usuário criado com sucesso." };
    }
    catch (err) {
        throw new Error("Erro ao tentar criar usuário.");
    }
}
export function cookie_extractor(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
}
;
