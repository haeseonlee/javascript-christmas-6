class VisitDate {
  constructor(visitDay) {
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
