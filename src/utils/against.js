// 中间内容用***代替
const against = (t) => {
  if (!t) return "";
  if (t.length <= 10) {
    return t;
  }
  return t.substring(0, 6) + "****" + t.substring(t.length - 4, t.length);
};

export default against;
