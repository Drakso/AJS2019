function isOddEven(number){
  if (num % 2 === 0) {
    stats.isEven = true;
  } else {
    stats.isEven = false;
  }
}

function isPositiveNegative(number){
  if (number >= 0) {
    return "Positive";
  } else {
    return "Negative";
  }

}

function getDigits(number){
  if(number >= 0) {
    return number.toString().length;
  } else {
    return number.toString().length - 1;
  }
}