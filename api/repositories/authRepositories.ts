import {IUser} from '../models/authModels.js';
import { BaseRepository } from './BaseRepository.js';

export class UserRepository extends BaseRepository<IUser> {
    async findByUsername(username: string): Promise<IUser | null> {
        return this._collection.findOne({username: username});
    }
}