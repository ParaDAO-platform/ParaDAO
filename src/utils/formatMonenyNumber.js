function formatMonenyNumber(number, toFixed = 2) {
  let str = [];
  if (!number) return 0;
  if (typeof number === "number") number = String(number);
  let tempNumber = number.split(".");
  number = tempNumber[0];
  if (number.length <= 3) {
    if (tempNumber[1]) {
      number += "." + tempNumber[1].slice(0, toFixed);
    }
    return number;
  }
  number
    .split("")
    .reverse()
    .forEach((item, index) => {
      if (index != 0 && index % 3 == 0) {
        str.push(",", item);
      } else {
        str.push(item);
      }
    });
  number = str.reverse().join("");
  if (tempNumber[1]) {
    number += "." + tempNumber[1].slice(0, toFixed);
  }
  return number;
}

export default formatMonenyNumber;
