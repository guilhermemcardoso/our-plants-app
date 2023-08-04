export function formatDate(date: string) {
  const newDate = new Date(date);
  let day = newDate.getDate().toString();
  let month = (newDate.getMonth() + 1).toString();
  let year = newDate.getFullYear().toString();

  if (day.length < 2) {
    day = `0${day}`;
  }

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (year.length < 2) {
    year = `0${year}`;
  }
  return `${day}/${month}/${year}`;
}
