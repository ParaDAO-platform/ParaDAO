import { BigNumber } from "bignumber.js";

function digitalConversion(number) {
  if (!number) return 0;
  let num = 0;
  let newNum = BigNumber(number);
  switch (true) {
    case 0 < number && number < 1000000:
      num = newNum.dividedBy(1000) + "K";
      break;
    case 1000000 <= number && number < 1000000000:
      num = newNum.dividedBy(1000000) + "M";
      break;
    case 1000000000 <= number && number < 1000000000000:
      num = newNum.dividedBy(1000000000) + "B";
      break;
    case 1000000000000 <= number && number < 1000000000000000:
      num = newNum.dividedBy(1000000000000) + "T";
      break;
    default:
      num = 0;
      break;
  }

  return num;
}

export default digitalConversion;
