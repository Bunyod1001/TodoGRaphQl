import { Todo } from "./todo.model";
import { User } from "./user.model";

export function setupRelations(){
    User.hasMany(Todo);
    Todo.belongsTo(User);
}