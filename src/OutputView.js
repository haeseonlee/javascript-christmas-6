import { Console } from "@woowacourse/mission-utils";
import { Badge } from "./Badge.js";

const OutputView = {
  printWelcomeMessage() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },

  printVisitMessage(visitDay) {
    Console.print(
      `12월 ${visitDay}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`
    );
  },

  printMenu(orders) {
    Console.print("\n<주문 메뉴>");
    for (let order of orders) {
      Console.print(`${order.getName()} ${order.getQuantity()}개`);
    }
  },

  printBeforeDiscount(payment) {
    Console.print("\n<할인 전 총주문 금액>");
    Console.print(`${payment.getBeforeAmount().toLocaleString()}원\n`);
  },

  printGiftEvent(payment) {
    Console.print("\n<증정 메뉴>");
    if (payment.getGiftAmount() === 0) {
      Console.print("없음\n");
      return;
    }
    Console.print("샴페인 1개\n");
  },

  printBenefitDetails(payment, visitDate) {
    Console.print("\n<혜택 내역>");
    const totalBenefit =
      payment.getDDayAmount() +
      payment.getWeekAmount() +
      payment.getSpecialAmount() +
      payment.getGiftAmount();
    if (totalBenefit === 0) {
      Console.print("없음\n");
      return;
    }
    Console.print(
      `크리스마스 디데이 할인 : -${payment.getDDayAmount().toLocaleString()}원`
    );
    if (visitDate.getDayOfWeek() === 5 || visitDate.getDayOfWeek() === 6) {
      Console.print(
        `주말 할인 : -${payment.getWeekAmount().toLocaleString()}원`
      );
    } else {
      Console.print(
        `평일 할인 : -${payment.getWeekAmount().toLocaleString()}원`
      );
    }
    Console.print(
      `특별 할인: -${payment.getSpecialAmount().toLocaleString()}원`
    );
    Console.print(
      `증정 이벤트 : -${payment.getGiftAmount().toLocaleString()}원`
    );
  },

  printTotalBenefitAmount(payment) {
    const totalBenefit =
      payment.getDDayAmount() +
      payment.getWeekAmount() +
      payment.getSpecialAmount() +
      payment.getGiftAmount();
    Console.print("\n<총혜택 금액>");
    Console.print(`-${totalBenefit.toLocaleString()}원\n`);
  },

  printAfterDiscountAmount(payment) {
    const discountAmount =
      payment.getBeforeAmount() -
      payment.getDDayAmount() -
      payment.getWeekAmount() -
      payment.getSpecialAmount();
    Console.print("\n<할인 후 예상 결제 금액>");
    Console.print(`${discountAmount.toLocaleString()}원`);
  },

  printBadge(payment) {
    const totalBenefit =
      payment.getDDayAmount() +
      payment.getWeekAmount() +
      payment.getSpecialAmount() +
      payment.getGiftAmount();
    Console.print("\n<12월 이벤트 배지>");
    Console.print(`${Badge.applyBadge(totalBenefit)}`);
  },
};

export default OutputView;
