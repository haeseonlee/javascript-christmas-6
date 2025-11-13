export const ChristmasDDay = {
  isDateWithinRange(targetDate) {
    const startDate = new Date("2023-12-1");
    const endDate = new Date("2023-12-25");

    if (
      targetDate.getTime() >= startDate.getTime() &&
      targetDate.getTime() <= endDate.getTime()
    ) {
      return true;
    }
    return false;
  },
};
