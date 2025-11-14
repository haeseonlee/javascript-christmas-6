import Order from "./Order.js";

export const OrderParser = {
  createOrder(orderMenusStr) {
    if (orderMenusStr.trim().length === 0) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }

    const orders = [];

    const menuAndQty = orderMenusStr.split(",").map((pair) => pair.trim());

    menuAndQty.forEach((pair) => {
      const menuPairs = pair.split("-");

      if (menuPairs.length !== 2) {
        throw new Error(
          "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
        );
      }

      const [name, quantityStr] = menuPairs;

      const quantity = Number(quantityStr);
      if (isNaN(quantity) || quantity < 1 || !Number.isInteger(quantity)) {
        throw new Error(
          "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
        );
      }

      orders.push(new Order(name, quantity));
    });
    return orders;
  },
};
