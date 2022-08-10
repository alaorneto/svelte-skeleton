import { BaseRepository } from './BaseRepository.js';
export class UserRepository extends BaseRepository {
    async findByUsername(username) {
        return this._collection.findOne({ username: username });
    }
}
