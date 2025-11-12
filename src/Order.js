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
}
