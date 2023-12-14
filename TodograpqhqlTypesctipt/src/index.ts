
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import sequelize from "./config/db.config";
import { setupRelations } from './models/relation';
import { Todo } from './models/todo.model';
import { User } from './models/user.model';

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
    Query:{
        todos:async ( parents, args) => {
    const res = await Todo.findAll();
    // {include: {all:true}} Tepadagi kodniki
    console.log(res);
    return res;
        },

        todo: async (parents, args) => await Todo.findByPk(args.id)
    },
Todo: {
  user: async (parents, args) => {
      console.log("parents", res );
     
      const res = await User.findByPk(parents.UserId);

      return res;
    }
},
    Mutation:{
        addTodo:async (parent,args) =>{
            const newTodo = {
                title: args.title,
                UserId:args.user_id,
            };
            return await Todo.create(newTodo);
        },
        addUser: async (parent, args) =>{
            const newUser = {
                name:args.name,
            };

            return await User.create(newUser);
        },
        updateTodo: async () => {
            // updateTodo логика ўзгартириш керак
          },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function bootsrapt() {
   await sequelize.authenticate();
   setupRelations();
  console.log("database connect");
   await sequelize.sync({
    alter:true,
    logging:false,
   });

   const {url} = await startStandaloneServer(server, {
    listen:{
        port:3000,
    },
   });
   console.log(url);
}


bootsrapt();