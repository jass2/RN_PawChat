export function timeSince(date) {
  console.log(date);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    let floor = Math.floor(interval);
    return '~' + floor + (isOne(floor) ? ' year ago' : ' years ago');
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    let floor = Math.floor(interval);
    return '~' + floor + (isOne(floor) ? ' month ago' : ' months ago');
  }
  interval = seconds / 86400;
  if (interval > 1) {
    let floor = Math.floor(interval);
    return floor + (isOne(floor) ? ' day ago' : ' days ago');
  }
  interval = seconds / 3600;
  if (interval > 1) {
    let floor = Math.floor(interval);
    return floor + (isOne(floor) ? ' hour ago' : ' hours ago');
  }
  interval = seconds / 60;
  if (interval > 1) {
    let floor = Math.floor(interval);
    return floor + (isOne(floor) ? ' minute ago' : ' minutes ago');
  }

  let floor = Math.floor(interval);
  return floor + (isOne(floor) ? ' second ago' : ' seconds ago');
}

function isOne(number) {
  return number === 1;
}
