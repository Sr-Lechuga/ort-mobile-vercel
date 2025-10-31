const createDate = (string) => {
  const date = new Date(string);
  if (isNaN(date.getTime())) return null; // When Invalid Date is created, Date.getTime() returns NaN
  return date;
};

module.exports = {
  createDate,
};
