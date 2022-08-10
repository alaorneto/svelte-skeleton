import mongoose from "mongoose";
import { IRead, IWrite } from "./interfaces.js";

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
    public readonly _collection: mongoose.Model<T>; 

    constructor(model: mongoose.Model<T>) {
        this._collection = model;
    }
    
    async find(item: object): Promise<T[]> {
        return this._collection.find(item);
    }

    async findById(id: string): Promise<T | null> {
        return this._collection.findById(id);
    }

    async create(item: object): Promise<T> {
        return this._collection.create(item);
    }

    async update(id: string, item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<void> {
        return this._collection.remove({_id: id});
    }
    
}