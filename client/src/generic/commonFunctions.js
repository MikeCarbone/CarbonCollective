export function getDate(timeString) {
  var friendlyDate = new Date(timeString);
  var pieces = friendlyDate.toString().split(' ');
  // var dayOfWeek = pieces[0];
  var month = pieces[1];
  var dayNum = pieces[2];
  var year = pieces[3];
  return `${month} ${dayNum}, ${year}`;
}