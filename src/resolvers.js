import uuidv4 from "uuid/v4";
import data from "./data.js";

const resolvers = {
  Query: {
    users: (parent, { limit }) =>
      limit ? data.users.slice(0, limit) : data.users,
    articles: (parent, { search }) =>
      search
        ? data.articles.filter(article => article.title.includes(search))
        : data.articles,
    greeting: (parent, { name }) => `Hello ${name || "World"}`
  },
  User: {
    articles: parent =>
      data.articles.filter(article => article.author === parent.id)
  },
  Article: {
    author: parent => data.users.filter(user => user.id === parent.author.id)
  },
  Mutation: {
    createUser: (parent, data) => {
      const { name, email, age } = data;

      if (data.users.find(user => user.email === email))
        throw new Error("User already exists!");

      const newUser = {
        id: uuidv4(),
        name,
        email,
        age
      };
      console.log(newUser);

      data.users.push(newUser);

      return newUser;
    }
    // updateUser: (parent, args) => {
    //   const user = data.users.find(user => user.id === args.id);

    //   const updatedUser = {
    //     ...user,
    //     name,
    //     email,
    //     age
    //   };
    //   console.log(updatedUser);

    //   return updatedUser;
    // }
  }
};

export default resolvers;
