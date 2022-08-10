import { ObjectId } from "mongodb";

export interface IBaseModel {
    readonly "_id": ObjectId;
}