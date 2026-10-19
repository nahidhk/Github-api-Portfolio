function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B"; // Billion
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M"; // Million
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K"; // Thousand
  } else {
    return num.toString(); // ছোট হলে 그대로
  }
}



export default formatNumber;