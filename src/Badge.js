export const Badge = {
  applyBadge(totalDiscountAmount) {
    if (totalDiscountAmount >= 20000) {
      return "산타";
    }
    if (totalDiscountAmount >= 10000) {
      return "트리";
    }
    if (totalDiscountAmount >= 5000) {
      return "별";
    }
    return "없음";
  },
};
