import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
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
    try {
      const jwtSecret = process.env.JWT_SECRET!;
      if (!token) {
        return false;
      }

      if (token) {
        const decodedToken = jwt.verify(token, jwtSecret) as {
          userId: number;
          exp: number;
        };
        if (decodedToken.exp < Date.now() / 1000) {
          return false;
        }
      }
    } catch (error) {
      throw new Error("Error verifying token");
    }

    return true;
  }

  static async login(email: string, password: string) {
    // Get user from database
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: email,
          // we may include this later
          // password: password
        },
      });
      if (user && user.password === password) {
        return user;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error logging in");
    }

    // Check password
    return null;
  }

  static async logout(email: string, loginStatus: boolean) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: email,
          // we may include this later
          // password: password
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error logging out");
    }
    // Get user from database

    return null;
  }

  static async getAll() {
    try {
      const users = await prisma.users.findMany();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting users");
    }
  }

  static async getById(id: number) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting user");
    }
  }

  static async create(name: string, email: string, password: string) {
    try {
      const user = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating user");
    }
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

  static async addProfileImage(userId: string, image: string) {
    try {
      const getUser = await prisma.users.findUnique({
        where: {
          id: Number(userId),
        },
      });
      const userImage = await prisma.users.update({
        where: {
          id: Number(userId),
        },
        data: {
          image: image,
        },
      });
      return userImage;
    } catch (error) {
      console.log(error);
      throw new Error("Error adding profile image");
    }
  }
}
