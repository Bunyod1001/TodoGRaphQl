import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";

export interface UserAttributes {
    id?: number;
    name: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes { }

export class User extends Model<UserInstance, UserAttributes> { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
});