import eventsConvertDatetime from './events-convert-time.filter.js';
import textTruncate from './text-truncate.filter.js';

export default {
  install (Vue) {
    Vue.filter('eventConvertDatetime', eventsConvertDatetime);
    Vue.filter('textTruncate', textTruncate);
  }
};