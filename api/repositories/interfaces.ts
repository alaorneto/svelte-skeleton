export interface IWrite<T> {
    create(item: object): Promise<T>;
    update(id: string, item: T): Promise<T>;
    delete(id: string): Promise<void>;
}

export interface IRead<T> {
    find(item: object): Promise<T[]>;
    findById(id: string): Promise<T | null>;
}