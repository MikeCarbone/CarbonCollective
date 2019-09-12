export function getDate(timeString) {
  var friendlyDate = new Date(timeString);
  var pieces = friendlyDate.toString().split(' ');
  // var dayOfWeek = pieces[0];
  var month = pieces[1];
  var dayNum = pieces[2];
  var year = pieces[3];
  return `${month} ${dayNum}, ${year}`;
}

export function ordinal_suffix_of(x) {
  var i = parseInt(x);
  var j = i % 10,
      k = i % 100;
  if (j === 1 && k !== 11) {
      return i + "st";
  }
  if (j === 2 && k !== 12) {
      return i + "nd";
  }
  if (j === 3 && k !== 13) {
      return i + "rd";
  }
  return i + "th";
}
