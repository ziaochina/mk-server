//返回15位长度的ID，前13位是时间后两位是随机数。
module.exports = () => new Date().getTime() * 100 + Math.round(Math.random() * 100);