export const ChristmasDDay = {
  isDateWithinRange(visitDate) {
    const startDate = new Date("2023-12-1");
    const endDate = new Date("2023-12-25");

    if (
      visitDate.getTime() >= startDate.getTime() &&
      visitDate.getTime() <= endDate.getTime()
    ) {
      return true;
    }
    return false;
  },

  applyDDayDiscount(visitDate) {
    if (!this.isDateWithinRange(visitDate)) {
      return 0;
    }

    const visitDay = visitDate.getDate();
    return 1000 + (visitDay - 1) * 100;
  },
};
