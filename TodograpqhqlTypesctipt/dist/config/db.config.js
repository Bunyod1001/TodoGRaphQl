"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: 'localhost',
    password: "1001",
    url: "postgres://postgres:admin@127.0.0.1:5432/todo_n120",
    logging: false,
    username: "postgres",
    database: "todo_n120",
    port: 5432,
});
exports.default = sequelize;
