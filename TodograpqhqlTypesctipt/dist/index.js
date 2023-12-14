"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const db_config_1 = require("./config/db.config");
const relation_1 = require("./models/relation");
const todo_model_1 = require("./models/todo.model");
const user_model_1 = require("./models/user.model");
const typeDefs = `#graphql
    type Todo {
        id:ID
        title:String
        isCompleted:Boolean
        user: User
    }
    
    type User{
        id:ID
        name:String
        todos:[Todo]
    }

    type Query{
     todos:[Todo]
     todo (id:Int) : Todo
    }

    type Mutation{
       addTodo(title:String, user_id: Int) : Todo
       addUser(name: String): User
       updateTodo:Todo
    }
`;
const resolvers = {
    Query: {
        todos: (parents, args) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield todo_model_1.Todo.findAll();
            // {include: {all:true}} Tepadagi kodniki
            console.log(res);
            return res;
        }),
        todo: (parents, args) => __awaiter(void 0, void 0, void 0, function* () { return yield todo_model_1.Todo.findByPk(args.id); })
    },
    Todo: {
        user: (parents, args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("parents", res);
            const res = yield user_model_1.User.findByPk(parents.UserId);
            return res;
        })
    },
    Mutation: {
        addTodo: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const newTodo = {
                title: args.title,
                UserId: args.user_id,
            };
            return yield todo_model_1.Todo.create(newTodo);
        }),
        addUser: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = {
                name: args.name,
            };
            return yield user_model_1.User.create(newUser);
        }),
        updateTodo: () => __awaiter(void 0, void 0, void 0, function* () {
            // updateTodo логика ўзгартириш керак
        }),
    },
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
function bootsrapt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_config_1.default.authenticate();
        (0, relation_1.setupRelations)();
        console.log("database connect");
        yield db_config_1.default.sync({
            alter: true,
            logging: false,
        });
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            listen: {
                port: 3000,
            },
        });
        console.log(url);
    });
}
bootsrapt();
