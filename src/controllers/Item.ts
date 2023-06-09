import prisma from "../../lib/prisma";

type User = {
  id: number;
  name: string;
  email: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default class Item {
  id: number;
  name: string;
  owner?: string;
  ownerId: number;
  price: number;
  priceId?: string;
  quantity: number | string;
  description?: string;
  image?: string;

  constructor(
    id: number,
    name: string,
    ownerId: number,
    price: number,
    priceId: string,
    quantity: number,
    owner?: string,
    description?: string,
    image?: string
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.ownerId = ownerId;
    this.price = price;
    this.priceId = priceId;
    this.quantity = quantity;
    this.description = description;
    this.image = image;
  }

  static async create(
    userId: number,
    userEmail: string, // may go unused
    username: string, // may go unused
    name: string,
    description: string,
    price: number,
    priceId: string,
    unlimited: boolean, // this number will be -1 if the user says this will be infinite
    quantity?: number,
    image?: string,
  ) {
    try {
      const item = await prisma.items.create({
        data: {
          description: description,
          name: name,
          owner: {
            connect: { id: userId },
          },
          price: price,
          quantity: quantity,
          unlimited: unlimited,
          image: image,
        },
      });
      return item;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating item");
    }
  }

  static async getAll(userId: number) {
    try {
      const items = await prisma.items.findMany({
        where: {
          ownerId: userId,
        },
      });
      return items;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting items");
    }
  }
}
