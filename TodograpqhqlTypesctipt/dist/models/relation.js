"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRelations = void 0;
const todo_model_1 = require("./todo.model");
const user_model_1 = require("./user.model");
function setupRelations() {
    user_model_1.User.hasMany(todo_model_1.Todo);
    todo_model_1.Todo.belongsTo(user_model_1.User);
}
exports.setupRelations = setupRelations;
