// Feito pelo chatGPT, transforma o formata YYYY-MM-DD em "2011-08-30T13:22:53.108+00:00"
function getCurrentDataAndTime(data) {
  const dataObj = new Date(data);
  const timezoneOffset = -dataObj.getTimezoneOffset();
  const dif = timezoneOffset >= 0 ? '+' : '-';
  const pad = (num) => String(num).padStart(2, '0');

  return dataObj.getFullYear() +
      '-' + pad(dataObj.getMonth() + 1) +
      '-' + pad(dataObj.getDate()) +
      'T' + pad(dataObj.getHours()) +
      ':' + pad(dataObj.getMinutes()) +
      ':' + pad(dataObj.getSeconds()) +
      '.' + String(dataObj.getMilliseconds()).padStart(3, '0') +
      dif + pad(Math.floor(Math.abs(timezoneOffset) / 60)) +
      ':' + pad(Math.abs(timezoneOffset) % 60);
}

export default getCurrentDataAndTime;