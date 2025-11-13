import { Menu } from "./Menu.js";

export const GiftEvent = {
  applyGiftEvent(totalOrderAmount) {
    if (totalOrderAmount >= 120000) {
      const giftPrice = Menu["샴페인"].price;
      return giftPrice;
    }
    return 0;
  },
};
