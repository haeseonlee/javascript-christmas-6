import InputView from "./InputView.js";
import { OrderParser } from "./OrderParser.js";
import OutputView from "./OutputView.js";
import VisitDate from "./VisitDate.js";

class App {
  async run() {
    OutputView.printWelcomeMessage();
    const visitDayStr = await InputView.readDate();

    const orderMenusStr = await InputView.readMenus();
    const orders = OrderParser.createOrder(orderMenusStr);

    const visitDay = Number(visitDayStr);
    OutputView.printVisitMessage(visitDay);
    OutputView.printMenu(orders);
  }
}

export default App;
