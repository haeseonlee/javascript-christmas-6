import InputView from "./InputView.js";
import { OrderParser } from "./OrderParser.js";
import OutputView from "./OutputView.js";
import { PaymentCalculator } from "./PaymentCalculator.js";
import VisitDate from "./VisitDate.js";

class App {
  async run() {
    OutputView.printWelcomeMessage();

    const visitDay = await this.readValidatedDate();
    const visitDate = new VisitDate(visitDay);

    const orders = await this.readValidatedOrders();

    OutputView.printVisitMessage(visitDay);
    OutputView.printMenu(orders);

    const payment = PaymentCalculator.calculate(visitDate, orders);
    OutputView.printBeforeDiscount(payment);
    OutputView.printGiftEvent(payment);
    OutputView.printBenefitDetails(payment, visitDate);
    OutputView.printTotalBenefitAmount(payment);
    OutputView.printAfterDiscountAmount(payment);
    OutputView.printBadge(payment);
  }

  async readValidatedDate() {
    while (true) {
      try {
        const visitDayStr = await InputView.readDate();
        const visitDay = Number(visitDayStr);

        if (isNaN(visitDay) || visitDay < 1 || visitDay > 31) {
          throw new Error(
            "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요."
          );
        }

        return visitDay;
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  async readValidatedOrders() {
    while (true) {
      try {
        const orderMenusStr = await InputView.readMenus();
        const orders = OrderParser.createOrder(orderMenusStr);
        return orders;
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }
}

export default App;
