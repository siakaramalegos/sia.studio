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
  }
}
