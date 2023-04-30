/**
 * This is a TypeScript class for creating and managing items with properties such as name, owner,
 * price, quantity, and description.
 * @property {number} id - The unique identifier for an item.
 * @property {string} name - The name of the item.
 */
import prisma from "../../lib/prisma";

type User = {
  id: number;
  name: string;
};

export default class Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  published: boolean;

  constructor(
    id: number,
    title: string,
    content: string,
    author: string,
    authorId: number,
    published: boolean
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.authorId = authorId;
    this.published = published;
  }

  static async create(
    user: User,
    title: string,
    content: string,
    image: string,
    published: boolean
  ) {
    const post = await prisma.posts.create({
      data: {
        content: content,
        title: title,
        author: {
          connect: { id: user.id },
        },
      },
    });
    return post;
  }

  static async destroy(id: number) {
    const post = await prisma.posts.delete({
      where: {
        id: id,
      },
    });
    return post;
  }

  static async get(username: string, id: number) {
    const post = await prisma.posts.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  }

  static async getAll(userId: number) {
    const posts = await prisma.posts.findMany({
      where: {
        authorId: userId,
      },
    });
    return posts;
  }
}
