class VisitDay {
  constructor(visitDate) {
    this.visitDay = new Date(2023, 11, visitDate);
  }

  getVisitDate() {
    return this.visitDay.getDate();
  }

  getDayOfWeek() {
    return this.visitDay.getDay();
  }
}

export default VisitDay;
