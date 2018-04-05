//时间类型
const DAYTIMETYPE = "Y-M-D h:m:s"
const DATETYPE = "Y-M-D"
const DAYMIN = "Y-M-D h:m"
const TIME = "h:m"
const SERIALTYPE = "YMDhms"

//时间戳转换成格式日期
const formatTime = (timestamp, format) => {

  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  const returnArr = [];
  const date = new Date(timestamp); //日期转换

  returnArr.push(date.getFullYear()); //年
  returnArr.push(formatNumber(date.getMonth() + 1)); //月
  returnArr.push(formatNumber(date.getDate())); //日

  returnArr.push(formatNumber(date.getHours())); //小时
  returnArr.push(formatNumber(date.getMinutes())); //分钟
  returnArr.push(formatNumber(date.getSeconds())); //秒

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const formatNumber = function (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取今天以后几天的日期
const getDates = (n) => {

  let dateArr = []

  for (let i = 0; i < n; i++) {
    var day = new Date();
    day.setDate(day.getDate() + i);
    var s = day.format("yyyy-MM-dd");
    dateArr.push(s)
  }

  return dateArr

}

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

module.exports = {
  formatTime: formatTime,
  getDates: getDates,
  DAYTIMETYPE: DAYTIMETYPE,
  TIME: TIME
}