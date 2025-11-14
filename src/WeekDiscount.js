import { findMenuByName } from "./Menu.js";

export const WeekDiscount = {
  applyWeekDiscount(visitDate, orders) {
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const day = visitDate.getDayOfWeek();
    const dayOfWeek = weekDays[day];

    if (dayOfWeek === "금" || dayOfWeek === "토") {
      return this.calculateWeekend(orders);
    }
    return this.calculateWeekDay(orders);
  },

  calculateWeekend(orders) {
    let menuCount = 0;
    for (let order of orders) {
      const menu = findMenuByName(order.getName());
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
      const menu = findMenuByName(order.getName());
      if (menu.type === "디저트") {
        const quantity = order.getQuantity();
        menuCount += quantity;
      }
    }
    return menuCount * 2023;
  },
};
