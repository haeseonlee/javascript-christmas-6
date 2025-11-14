import InputView from "./InputView.js";
import { OrderParser } from "./OrderParser.js";
import OutputView from "./OutputView.js";
import { PaymentCalculator } from "./PaymentCalculator.js";
import VisitDate from "./VisitDate.js";

class App {
  async run() {
    OutputView.printWelcomeMessage();
    const visitDayStr = await InputView.readDate();
    const visitDay = Number(visitDayStr);
    const visitDate = new VisitDate(visitDay);

    const orderMenusStr = await InputView.readMenus();
    const orders = OrderParser.createOrder(orderMenusStr);

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
}

export default App;
