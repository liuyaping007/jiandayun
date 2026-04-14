/**
 * 生成随机id
 * @returns
 */
export function generateID(e) {
  e = e || 16;
  let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

/**
 * 计算绝对值
 * @param pixel
 * @param scale
 * @returns {number}
 */
export function calcAbsolute(pixel, scale) {
  return Number(pixel / scale);
}

/**
 * 计算相对值
 * @param pixel
 * @param scale
 * @returns {number}
 */
export function calcRelative(pixel, scale) {
  return Number(pixel * scale);
}

/**
 * 防抖函数，当参数immediate为true时为饿触发，false为懒触发
 * @param func
 * @param delay
 * @param immediate
 * @returns {function(...[*]=)}
 */
export function debounce(func, delay, immediate = false) {
  //immediate为true时立即执行，反之为非立即执行
  let timeout;
  return function(...arg) {
    let _this = this;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      //立即执行
      let applyNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
      if (applyNow) func.apply(_this, arg);
    } else {
      //非立即执行
      timeout = setTimeout(() => {
        func.apply(_this, arg);
      }, delay);
    }
  };
}
