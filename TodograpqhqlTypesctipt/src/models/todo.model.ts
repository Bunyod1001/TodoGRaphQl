import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";

export interface TodoAttributes {
    id?: number;
    title: string;
    isCompleted: boolean;
    UserId: number;
}

export interface TodoInstance extends Model<TodoAttributes>, TodoAttributes { }

export class Todo extends Model<TodoInstance, TodoAttributes> { }

Todo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
});

