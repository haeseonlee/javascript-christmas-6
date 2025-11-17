import Order from "./src/Order.js";
import { findMenuByName } from "./src/Menu.js";
import VisitDate from "./src/VisitDate.js";
import { PaymentCalculator } from "./src/PaymentCalculator.js";
import { Badge } from "./src/Badge.js";

export function run() {
  const step1 = document.getElementById("step-1-welcome");
  const step2 = document.getElementById("step-2-date");
  const step3 = document.getElementById("step-3-order");
  const result = document.getElementById("result");
  const plannerTitle = document.getElementById("planner-title");
  const dateInputError = document.getElementById("date-input-error"); // 날짜 잘못 입력 경고
  const orderInputError = document.getElementById("order-input-error"); //주문 잘못 입력 경고
  const reservationBtn = document.getElementById("reservation-btn"); // 예약하기 버튼
  const visitDateInput = document.getElementById("visit-date-input"); // 날짜 입력창
  const visitDateBtn = document.getElementById("visit-date-btn"); // 날짜 제출하기 버튼
  const orderMenuSelect = document.getElementById("select-order-input"); //메뉴 선택
  const orderMenuQty = document.getElementById("order-quantity-input"); //메뉴 수량
  const selectOrderBtn = document.getElementById("select-order-btn"); //메뉴 추가 버튼
  const selectedOrders = document.getElementById("selected-orders"); //메뉴 추가시 보여줌
  const orderCompleteBtn = document.getElementById("order-complete-btn"); //주문 완료시 버튼
  const visitDatePreview = document.getElementById("visit-date-preview"); // 방문날짜&미리보기 문구
  const orderedMenus = document.getElementById("ordered-menus");
  const beforeDiscountAmount = document.getElementById(
    "before-discount-amount"
  );
  const giftMenu = document.getElementById("gift-menu");
  const benefitDetails = document.getElementById("benefit-details");
  const totalBenefitAmount = document.getElementById("total-benefit-amount");
  const afterDiscountAmount = document.getElementById("after-discount-amount");
  const eventBadge = document.getElementById("event-badge");

  // 1. 예약하기 -> 날짜 입력 이동
  reservationBtn.addEventListener("click", () => {
    step1.style.display = "none";
    step2.style.display = "block";
  });

  // 날짜 선언
  let visitDate = null;
  let orders = [];

  // 2. 날짜입력 -> 날짜 로직 실행 -> 주문 입력 이동
  visitDateBtn.addEventListener("click", () => {
    const visitDay = Number(visitDateInput.value.trim());

    if (
      isNaN(visitDay) ||
      !Number.isInteger(visitDay) ||
      visitDay < 1 ||
      visitDay > 31
    ) {
      dateInputError.innerHTML =
        "잘못된 입력값입니다. 정확한 날짜를 입력해 주세요.";
      return;
    }

    dateInputError.innerText = "";
    visitDate = new VisitDate(visitDay);

    step2.style.display = "none";
    step3.style.display = "block";
  });

  // 3. 메뉴 선택, 수량 입력 -> 선택된 메뉴 보여줌 -> 선택된 메뉴 저장
  selectOrderBtn.addEventListener("click", () => {
    const name = orderMenuSelect.value;
    const quantity = Number(orderMenuQty.value);

    if (isNaN(quantity) || !Number.isInteger(quantity) || quantity < 1) {
      orderInputError.innerHTML = "수량을 정확하게 입력해주세요.";
      return;
    }

    const alreadyHasMenu = orders.find((order) => order.name === name);
    if (alreadyHasMenu) {
      orderInputError.innerHTML = "이미 선택한 메뉴입니다.";
      return;
    }

    const totalQuantity =
      orders.reduce((sum, order) => sum + order.quantity, 0) + quantity;
    if (totalQuantity > 20) {
      orderInputError.innerHTML = "총 주문 가능 수량은 최대 20개입니다.";
      return;
    }

    orderInputError.innerHTML = "";
    orders.push(new Order(name, quantity));

    const showSelectedOrders = orders
      .map((order) => `<p>${order.name} ${order.quantity}</p>`)
      .join("");
    selectedOrders.innerHTML = `<h4>선택한 메뉴</h4>${showSelectedOrders}`;
  });

  // 4. 받을 수 있는 혜택 보여주기
  orderCompleteBtn.addEventListener("click", () => {
    const isOrderOnlyDrinks = orders.every(
      (order) => findMenuByName(order.name).type === "음료"
    );

    if (isOrderOnlyDrinks) {
      orderInputError.innerHTML = "음료만 주문할 수 없습니다.";
      return;
    }

    step3.style.display = "none";
    plannerTitle.style.display = "none";
    result.style.display = "block";

    visitDatePreview.innerHTML = `12월 ${visitDate.getVisitDate()}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`;

    const payment = PaymentCalculator.calculate(visitDate, orders);
    const showOrderedMenus = orders
      .map((order) => `<p>${order.name} ${order.quantity}개</p>`)
      .join("");
    orderedMenus.innerHTML = `<h4><주문 메뉴></h4>${showOrderedMenus}`;

    beforeDiscountAmount.innerHTML = `<h4><할인 전 총 주문 금액></h4>${payment
      .getBeforeAmount()
      .toLocaleString()}원`;

    if (payment.getGiftAmount() === 0) {
      giftMenu.innerHTML = `<h4><증정 메뉴></h4>없음`;
    } else {
      giftMenu.innerHTML = `<h4><증정 메뉴></h4>샴페인 1개`;
    }

    let showBenefitDetails = `<h4><혜택 내역></h4>`;
    let hasBenefit = false;

    if (payment.getDDayAmount() > 0) {
      showBenefitDetails += `크리스마스 디데이 할인: -${payment
        .getDDayAmount()
        .toLocaleString()}원<br>`;
      hasBenefit = true;
    }

    if (payment.getWeekAmount() > 0) {
      showBenefitDetails += `평일 할인: -${payment
        .getWeekAmount()
        .toLocaleString()}원<br>`;
      hasBenefit = true;
    }

    if (payment.getSpecialAmount() > 0) {
      showBenefitDetails += `특별 할인: -${payment
        .getSpecialAmount()
        .toLocaleString()}원<br>`;
      hasBenefit = true;
    }

    if (payment.getGiftAmount() > 0) {
      showBenefitDetails += `증정 이벤트: -${payment
        .getGiftAmount()
        .toLocaleString()}원<br>`;
      hasBenefit = true;
    }

    if (!hasBenefit) {
      showBenefitDetails += "없음";
    }

    benefitDetails.innerHTML = showBenefitDetails;

    const totalBenefit =
      payment.getDDayAmount() +
      payment.getWeekAmount() +
      payment.getSpecialAmount() +
      payment.getGiftAmount();

    totalBenefitAmount.innerHTML = `<h4><총혜택 금액></h4>-${totalBenefit.toLocaleString()}원`;

    const discountAmount =
      payment.getBeforeAmount() -
      payment.getDDayAmount() -
      payment.getWeekAmount() -
      payment.getSpecialAmount();
    afterDiscountAmount.innerHTML = `<h4><할인 후 예상 결제 금액></h4>${discountAmount.toLocaleString()}원`;

    eventBadge.innerHTML = `<h4><12월 이벤트 배지></h4>${Badge.applyBadge(
      totalBenefit
    )}`;
  });
}
