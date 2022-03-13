function moneyConversion(money: number) {
  const result = money.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
  return result;
}

export default moneyConversion;
