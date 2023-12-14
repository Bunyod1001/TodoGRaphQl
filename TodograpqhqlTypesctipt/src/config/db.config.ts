
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "postgres",
    host: 'localhost',
    password: "1001",
    url: "postgres://postgres:admin@127.0.0.1:5432/todo_n120",
    logging: false,
    username: "postgres",
    database: "todo_n120",
    port: 5432,
});

export default sequelize;