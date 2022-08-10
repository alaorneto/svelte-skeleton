export class BaseRepository {
    constructor(model) {
        this._collection = model;
    }
    async find(item) {
        return this._collection.find(item);
    }
    async findById(id) {
        return this._collection.findById(id);
    }
    async create(item) {
        return this._collection.create(item);
    }
    async update(id, item) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        return this._collection.remove({ _id: id });
    }
}
