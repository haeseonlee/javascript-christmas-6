import { findMenuByName } from "./Menu.js";

export default class Order {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  getName() {
    return this.name;
  }

  getQuantity() {
    return this.quantity;
  }

  getTotalPrice() {
    const menu = findMenuByName(this.name);
    return menu.price * this.quantity;
  }
}
