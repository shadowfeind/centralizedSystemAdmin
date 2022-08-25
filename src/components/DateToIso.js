const DateToIso = (date) => {
  const offSet = new Date().getTimezoneOffset();
  const myDate = Date.parse(date) - offSet * 60 * 1000;

  return new Date(myDate).toISOString();
};

export default DateToIso;
