import { ChristmasDDay } from "./ChristmasDDay.js";
import { GiftEvent } from "./GiftEvent.js";
import Payment from "./Payment.js";
import { SpecialEvent } from "./SpecialEvent.js";
import { WeekDiscount } from "./WeekDiscount.js";

export const PaymentCalculator = {
  calculate(visitDate, orders) {
    let totalAmount = 0;
    for (let order of orders) {
      totalAmount += order.getTotalPrice();
    }

    const dDayAmount = ChristmasDDay.applyDDayDiscount(visitDate);
    const weekAmount = WeekDiscount.applyWeekDiscount(visitDate, orders);
    const specialAmount = SpecialEvent.applySpecialDiscount(visitDate);
    const giftAmount = GiftEvent.applyGiftEvent(totalAmount);

    return new Payment(
      totalAmount,
      dDayAmount,
      weekAmount,
      specialAmount,
      giftAmount
    );
  },
};
