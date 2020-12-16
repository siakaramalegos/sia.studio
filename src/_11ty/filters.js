const { DateTime } = require("luxon");
const rootUrl = require('../_data/metadata.json').url

module.exports = {
  readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
    return DateTime.fromISO(dateStr).toFormat(formatStr);
  },
  generateShareLink: (url, text) => {
    const shareText = `${text} by @TheGreenGreek`
    const shareUrl = `${rootUrl}${url}`
    return `https://twitter.com/intent/tweet/?text=${encodeURI(shareText)}&amp;url=${encodeURI(shareUrl)}`
  },
  generateDiscussionLink: (url) => {
    const postUrl = `${rootUrl}${url}`
    return `https://twitter.com/search?f=tweets&src=typd&q=${encodeURI(postUrl)}`
  },
  getSelect: posts => posts.filter(post => post.data.isSelect),
  truncate: text => text.length > 300 ? `${text.substring(0, 300)}...` : text,
  getReadingTime: text => {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  },
  readableDate: dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  },
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  htmlDateString: (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  },
  // Get the first `n` elements of a collection.
  head: (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  }
}
