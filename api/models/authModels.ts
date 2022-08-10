import mongoose from "mongoose";
import { IBaseModel } from "./baseModels.js";

interface IUser extends IBaseModel {
    username: string,
    email: string,
    password: string,
    is_admin: boolean,
    is_staff: boolean,
    groups: IGroup[],
    roles: IRole[]
}

const userSchema = new mongoose.Schema<IUser>({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_staff: {
        type: Boolean,
        default: false
    },
    groups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group"
        }
      ],
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
});

const User = mongoose.model<IUser>('User', userSchema);

export {IUser, User};

interface IGroup extends IBaseModel {
    name: string,
    description: string,
    users: IUser[]
}

const groupSchema = new mongoose.Schema<IGroup>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ]
});

const Group = mongoose.model<IGroup>('Group', groupSchema);

export {IGroup, Group};

interface IRole extends IBaseModel { 
    name: string,
    description: string,
    permissions: IPermission[],
    users: IUser[]
}

const roleSchema = new mongoose.Schema<IRole>({
    name: {
        type: String,
        required: true
    },
    description: { 
        type: String,
    },
    permissions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Permission"
        }
      ],
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
});

const Role = mongoose.model<IRole>('Role', roleSchema);

export {IRole, Role};

interface IPermission extends IBaseModel {
    code: string,
    description: string
}

const permissionSchema = new mongoose.Schema<IPermission>({
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
});

const Permission = mongoose.model<IPermission>('Permission', permissionSchema);

export {IPermission, Permission};