import { Menu } from "./Menu.js";

export const WeekDiscount = {
  calculateWeekend(orders) {
    let menuCount = 0;
    for (let order of orders) {
      const menu = Menu.findMenuByName(order.getName());
      if (menu.type === "메인") {
        const quantity = order.getQuantity();
        menuCount += quantity;
      }
    }
    return menuCount * 2023;
  },

  calculateWeekDay(orders) {
    let menuCount = 0;
    for (let order of orders) {
      const menu = Menu.findMenuByName(order.getName());
      if (menu.type === "디저트") {
        const quantity = order.getQuantity();
        menuCount += quantity;
      }
    }
    return menuCount * 2023;
  },
};
