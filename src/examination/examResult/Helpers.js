export const gradeCalc = (marksCalc) => {
  if (marksCalc >= 90) {
    return "A+";
  } else if (marksCalc >= 80 && marksCalc < 90) {
    return "A";
  } else if (marksCalc >= 70 && marksCalc < 80) {
    return "B+";
  } else if (marksCalc >= 60 && marksCalc < 70) {
    return "B";
  } else if (marksCalc >= 50 && marksCalc < 60) {
    return "C+";
  } else if (marksCalc >= 40 && marksCalc < 50) {
    return "C";
  } else if (marksCalc >= 30 && marksCalc < 40) {
    return "D+";
  } else if (marksCalc >= 20 && marksCalc < 30) {
    return "D";
  } else if (marksCalc >= 1 && marksCalc < 20) {
    return "E";
  } else {
    return "N";
  }
};

export const pointCalc = (marked) => {
  if (marked >= 90) {
    return "4.00";
  } else if (marked >= 80 && marked < 90) {
    return "3.60";
  } else if (marked >= 70 && marked < 80) {
    return "3.20";
  } else if (marked >= 60 && marked < 70) {
    return "2.80";
  } else if (marked >= 50 && marked < 60) {
    return "2.40";
  } else if (marked >= 40 && marked < 50) {
    return "2.00";
  } else if (marked >= 30 && marked < 40) {
    return "1.60";
  } else if (marked >= 20 && marked < 30) {
    return "1.20";
  } else if (marked >= 1 && marked < 20) {
    return "0.80";
  } else {
    return "0.00";
  }
};

export const gpaToGrade = (x) => {
  if (x > 3.6) {
    return "A+";
  } else if (x > 3.2 && x <= 3.6) {
    return "A";
  } else if (x > 2.8 && x <= 3.2) {
    return "B+";
  } else if (x > 2.4 && x <= 2.8) {
    return "B";
  } else if (x > 2.0 && x <= 2.4) {
    return "C+";
  } else if (x > 1.6 && x <= 2.0) {
    return "C";
  } else if (x > 1.2 && x <= 1.6) {
    return "D+";
  } else if (x > 0.8 && x <= 1.2) {
    return "D";
  } else if (x > 0 && x <= 0.8) {
    return "E";
  } else {
    return "N";
  }
};

export const gpaToRemarks = (x) => {
  if (x > 3.6) {
    return "OUTSTANDING";
  } else if (x > 3.2 && x <= 3.6) {
    return "EXCELLENT";
  } else if (x > 2.8 && x <= 3.2) {
    return "VERY GOOD";
  } else if (x > 2.4 && x <= 2.8) {
    return "GOOD";
  } else if (x > 2.0 && x <= 2.4) {
    return "SATISFACTORY";
  } else if (x > 1.6 && x <= 2.0) {
    return "ACCEPTABLE";
  } else if (x > 1.2 && x <= 1.6) {
    return "PARTIALLY ACCEPTABLE";
  } else if (x > 0.8 && x <= 1.2) {
    return "INSUFFICIENT";
  } else if (x > 0 && x <= 0.8) {
    return "VERY INSUFFICIENT";
  } else {
    return "NOT QUALIFIED";
  }
};
