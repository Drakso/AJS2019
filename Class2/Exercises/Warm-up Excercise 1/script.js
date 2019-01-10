function getNumberStats(num) {
  // Initial stats object
  let stats = {
    number: num,
    isPositive: null,
    isEven: null
  };

  // Checks if number is positive
  if (num > 0) {
    stats.isPositive = true;
  } else {
    stats.isPositive = false;
  }

  // Checks if number is even
  if (num % 2 === 0) {
    stats.isEven = true;
  } else {
    stats.isEven = false;
  }

  // Returns the stats
  return stats;
}

let myNumStats = getNumberStats(321);

console.log(myNumStats);
