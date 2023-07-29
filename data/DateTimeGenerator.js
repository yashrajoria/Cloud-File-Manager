function getCurrentDateAndTime() {
  const currentDateAndTime = new Date();
  const year = currentDateAndTime.getFullYear();
  const month = currentDateAndTime.getMonth() + 1;
  const day = currentDateAndTime.getDate();
  const hours = currentDateAndTime.getHours();
  const minutes = currentDateAndTime.getMinutes();
  const seconds = currentDateAndTime.getSeconds();

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
  };
}

const dateTimeComponents = getCurrentDateAndTime();
const Current_Date = `${dateTimeComponents.day}-${dateTimeComponents.month}-${dateTimeComponents.year}`;
const Current_Time = `${dateTimeComponents.hours}:${dateTimeComponents.minutes}:${dateTimeComponents.seconds}`;

export { Current_Date, Current_Time };
