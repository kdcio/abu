const dateFormat = (date) => {
  const parts = date.split("-");
  const year = parts[0];
  let month;
  switch (parts[1]) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    default:
      month = "December";
      break;
  }

  const day = parts[2];
  return `${month} ${day}, ${year}`;
};

const dateFormatInput = (date) => {
  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : `${month}`;

  let day = date.getDate();
  day = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${month}-${day}`;
};

module.exports = { dateFormat, dateFormatInput };
