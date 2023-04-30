import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken"
// import Cookies from "js-cookie";

export default class User {
  id: number;
  name: string;
  email: string;

  constructor(
    id: number,
    name: string,
    email: string,
    logged: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async isLoggedIn(token: string) {
    const jwtSecret = process.env.JWT_SECRET!
    if(!token) {
      return false
    }

    if(token) {
      const decodedToken = jwt.verify(token, jwtSecret) as { userId: number, exp: number}
      if(decodedToken.exp < Date.now() / 1000) {
        return false
      }
    }

    return true
  }

  static async login(email: string, password: string) {
    // Get user from database
    const user = await prisma.users.findFirst({
      where: {
        email: email,
        // we may include this later
        // password: password
      },
    });

    // Check password
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  static async logout(email: string, loginStatus: boolean) {
    // Get user from database
    const user = await prisma.users.findFirst({
      where: {
        email: email,
        // we may include this later
        // password: password
      },
    });

    return null;
  }

  static async getAll() {
    const users = await prisma.users.findMany();
    return users;
  }

  static async getById(id: number) {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  static async create(name: string, email: string, password: string) {
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    return user;
  }

  static async createMany() {
    const users = await prisma.users.createMany({
      data: [
        {
          name: "Alice",
          email: "mail@mail.com",
          password: "1234",
        },
        {
          name: "Bob",
          email: "mailBob@mail.com",
          password: "1234",
        },
      ],
    });
  }
}
