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
  email: string;
};

export default class Item {
  id: number;
  name: string;
  owner: string;
  ownerId: number;
  price: number;
  quantity: number | string;
  description?: string;

  /**
   * This is a constructor function that initializes properties for an object with optional description
   * parameter.
   * @param {number} id - a number representing the unique identifier of an item
   * @param {string} name - The name of the item being constructed.
   * @param {string} owner - The "owner" parameter is a string that represents the name of the owner of
   * the item being constructed.
   * @param {number} ownerId - ownerId is a parameter that represents the unique identifier of the
   * owner of the item. It is likely used to associate the item with a specific user or account in a
   * database or system.
   * @param {number} price - The "price" parameter is a number that represents the cost of the item
   * being constructed.
   * @param {number} quantity - The "quantity" parameter in the constructor is a number that represents
   * the quantity or amount of the item being created. It could be the number of units of a product,
   * the amount of a certain ingredient in a recipe, or any other numerical quantity relevant to the
   * item being created.
   * @param {string} [description] - The "description" parameter is an optional string that provides
   * additional information or details about the object being constructed. It is marked with a question
   * mark (?) after the parameter name, indicating that it is not required to be passed in when
   * creating an instance of the object.
   */
  constructor(
    id: number,
    name: string,
    owner: string,
    ownerId: number,
    price: number,
    quantity: number,
    description?: string
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.ownerId = ownerId;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }

  /**
   * This function creates a new item with a given name, price, and quantity (optional) for a specified
   * user using Prisma ORM.
   * @param {User} user - The user parameter is an object of type User, which likely contains
   * information about the user who is creating the item.
   * @param {string} name - The name of the item being created.
   * @param {number} price - The "price" parameter is a number that represents the cost of the item
   * being created.
   * @param {number | "infinite"} [quantity] - The quantity parameter is an optional parameter that can
   * either be a number or the string "infinite". It represents the number of items available for
   * purchase. If the value is "infinite", it means that there is an unlimited quantity of the item
   * available.
   * @returns The `create` function is returning the newly created `item` object.
   */
  // static async create(
  //   user: User,
  //   name: string,
  //   description: string,
  //   price: number,
  //   unlimited: boolean,
  //   quantity?: number, // this number will be -1 if the user says this will be infinite
  // ) {
  //   const item = await prisma.items.create({
  //     data: {
  //       description: description,
  //       name: name,
  //       owner: {
  //         connect: { id: user.id },
  //       },
  //       price: price,
  //       quantity: quantity,
  //     },
  //   });
  //   return item;
  // }

  static async create(
    userId: number,
    userEmail: string,
    username: string,
    name: string,
    description: string,
    price: number,
    unlimited: boolean, // this number will be -1 if the user says this will be infinite
    quantity?: number
  ) {
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
      },
    });
    return item;
  }
}
