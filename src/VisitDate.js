class VisitDate {
  constructor(visitDay) {
    if (isNaN(visitDay)) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
    this.visitDate = new Date(2023, 11, visitDay);
  }

  getVisitDate() {
    return this.visitDate.getDate();
  }

  getDayOfWeek() {
    return this.visitDate.getDay();
  }
}

export default VisitDate;
