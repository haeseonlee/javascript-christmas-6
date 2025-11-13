export default class Payment {
  constructor(beforeAmount, dDayAmount, weekAmount, specialAmount, giftAmount) {
    this.beforeAmount = beforeAmount;
    this.dDayAmount = dDayAmount;
    this.weekAmount = weekAmount;
    this.specialAmount = specialAmount;
    this.giftAmount = giftAmount;
  }

  getBeforeAmount() {
    return this.beforeAmount;
  }

  getDDayAmount() {
    return this.dDayAmount;
  }

  getWeekAmount() {
    return this.weekAmount;
  }

  getSpecialAmount() {
    return this.specialAmount;
  }

  getGiftAmount() {
    return this.giftAmount;
  }
}
