import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    OutputView.printWelcomeMessage();
    const visitDay = await InputView.readDate();
  }
}

export default App;
