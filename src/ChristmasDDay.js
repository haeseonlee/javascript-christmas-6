export const ChristmasDDay = {
  isDateWithinRange(visitDate) {
    const startDate = new Date("2023-12-1");
    const endDate = new Date("2023-12-25");

    if (
      visitDate.getVisitDate() >= startDate.getDate() &&
      visitDate.getVisitDate() <= endDate.getDate()
    ) {
      return true;
    }
    return false;
  },

  applyDDayDiscount(visitDate) {
    if (!this.isDateWithinRange(visitDate)) {
      return 0;
    }

    const visitDay = visitDate.getVisitDate();
    return 1000 + (visitDay - 1) * 100;
  },
};
