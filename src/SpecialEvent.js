export const SpecialEvent = {
  applySpecialDiscount(visitDate) {
    const specialDay = [3, 10, 17, 24, 25, 31];

    const visitDay = visitDate.getVisitDate();
    if (specialDay.includes(visitDay)) {
      return 1000;
    }
    return 0;
  },
};
