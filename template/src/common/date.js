/**
 * Created by Amg on 2017/2/22.
 */

export function dateFormat(date, format) {
  if (!date) {
    alert('请传入需要格式化时间参数！');
    return '';
  }

  let da = date;
  if (typeof date === 'string') da = date.replace(/-/g, '/');

  const d = new Date(da);

  if (!(d instanceof Date)) {
    alert('时间格式错误！');
    return '';
  }

  const dict = {
    yyyy: d.getFullYear(),
    M: d.getMonth() + 1,
    d: d.getDate(),
    H: d.getHours(),
    m: d.getMinutes(),
    s: d.getSeconds(),
    MM: (`${d.getMonth() + 101}`).substr(1),
    dd: (`${d.getDate() + 100}`).substr(1),
    HH: (`${d.getHours() + 100}`).substr(1),
    mm: (`${d.getMinutes() + 100}`).substr(1),
    ss: (`${d.getSeconds() + 100}`).substr(1),
  };
  try {
    return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, f => dict[f]);
  } catch (e) {
    return d;
  }
}

const checkNum = (n, min, max) => (n > min && n < max);

const defaultTimeOptions = {
  isCtrYear: false,
  isCtrMonth: false,
  isCtrDay: false,
  isCtrHours: false,
  isCtrMinutes: false,
  isCtrSeconds: false,
  isShowHalfHours: false,
  isShowHalfMinutes: false,
  dateFormatText: 'yyyy-MM-dd T HH:mm:ss',
  beforeText: '前',
  yearText: '年',
  monthText: '月',
  dayText: '天',
  hoursText: '小时',
  minutesText: '分钟',
  secondsText: '秒',
  justNowText: '刚刚',
  maxYearNum: 0,
  maxMonthNum: 12,
  maxDayNum: 30,
  maxHoursNum: 24,
  maxMinutesNum: 60,
  maxSecondsNum: 60,
};

export function getTimeBeforeNow(date, opt) {
  if (!date) {
    alert('请输入时间！');
    return null;
  }

  // debugger
  const d = dateFormat(date);
  const now = new Date();
  const sInterval = parseInt((now.getTime() - d.getTime()) / 1000, 10);
  const mInterval = parseInt(sInterval / 60, 10);
  const hInterval = parseInt(mInterval / 60, 10);

  const {
    beforeText, justNowText, isShowHalfMinutes, isShowHalfHours,
    isCtrYear, isCtrMonth, isCtrDay, isCtrHours, isCtrMinutes, isCtrSeconds,
    yearText, monthText, dayText, hoursText, minutesText, secondsText,
    maxYearNum, maxMonthNum, maxDayNum, maxHoursNum, maxMinutesNum, maxSecondsNum,
  } = { ...defaultTimeOptions, ...opt };

  if (isCtrYear && (now.getYear() - d.getYear()) <= maxYearNum) {
    return `${now.getYear() - d.getYear()}${yearText}${beforeText}`;
  }
  if (isCtrMonth && (now.getMonth() - d.getMonth()) <= maxMonthNum) {
    return `${now.getMonth() - d.getMonth()}${monthText}${beforeText}`;
  }
  if (isCtrDay && (now.getDay() - d.getDay()) <= maxDayNum) {
    return `${now.getDay() - d.getDay()}${dayText}${beforeText}`;
  }
  if (isCtrHours && checkNum(hInterval, 1, maxHoursNum)) {
    return `${hInterval}${hoursText}${beforeText}`;
  }
  if (isCtrMinutes && checkNum(mInterval, 1, maxMinutesNum)) {
    if (isShowHalfHours && mInterval === 30) {
      return `半${hoursText}${beforeText}`;
    }
    return `${mInterval}${minutesText}${beforeText}`;
  }
  if (isCtrSeconds && checkNum(sInterval, 1, maxSecondsNum)) {
    if (isShowHalfMinutes && sInterval === 30) {
      return `半${minutesText}${beforeText}`;
    }
    return `${sInterval}${secondsText}${beforeText}`;
  }
  if (isCtrSeconds && sInterval <= 1) {
    return `${justNowText}`;
  }

  return dateFormat(d, opt.dateFormatText);
}

// 日期处理
export class DateExtend {
  static getNow(dateType) {
    const now = new Date();
    return dateFormat(now, dateType);
  }

  static getNowWeekNumber() {
    const week = new Date().getDay();
    let nowWeek = week;
    if (week === 0) nowWeek = 7;
    return nowWeek;
  }

  static getOneDayWeekWithDateObject(deltaDay = 0, dateType, weekType = [1, 2, 3, 4, 5, 6, 7]) {
    const oneDayLong = 24 * 60 * 60 * 1000;
    const now = new Date();
    const dayTime = now.getTime() + (deltaDay * oneDayLong);
    const day = new Date(dayTime);
    const weekDay = now.getDay() + deltaDay;
    const week = weekDay > 0 ? weekDay % 7 : 7 + (weekDay % 7);
    return {
      date: dateFormat(day, dateType),
      week: week === 0 ? weekType[6] : weekType[week - 1],
    };
  }

  static getThisWeek(start, dateType, weekType) {
    const today = new Date().getDay();
    const weekArray = [0, 1, 2, 3, 4, 5, 6];
    return weekArray.reduce((prev, next) => {
      prev.push(DateExtend.getOneDayWeekWithDateObject((next + start) - today, dateType, weekType));
      return prev;
    }, []);
  }

  static getThisWeekStartMondayArray(dateType, weekType) {
    return DateExtend.getThisWeek(1, dateType, weekType);
  }

  static getThisWeekStartSundayArray(dateType, weekType) {
    return DateExtend.getThisWeek(0, dateType, weekType);
  }
}

export function timeStampConvert(dateString) {
  const d = Date(parseInt(dateString, 10) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  return new Date(d.replace(/-/g, '/'));
}

// 时间戳转换
export function dateConvert(dateString, split) {
  const dt = timeStampConvert(dateString);
  return `${dt.getFullYear()}${split}${dt.getMonth() + 1}${split}${dt.getDate()}`;
}

// 计算两个日期之间的天数
export function getDateDay(date) {
  const now = new Date();
  return parseInt(Math.abs(now - date) / 1000 / 60 / 60 / 24, 10);
}
