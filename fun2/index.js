//柯里化将一个多参数函数拆解为一系列的单元链式函数

//严格柯里化

// function curry(fn, arity = fn.length) {
//   return (function nextCurried(prevArgs) {
//     return function curried(nextArg) {
//       var args = prevArgs.concat([nextArg]);
//       if (args.length >= arity) {
//         return fn(...args);
//       } else {
//         return nextCurried(args);
//       }
//     }
//   })([]);
// }

//松散柯里化

function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(...nextArgs) {
      let args = prevArgs.concat(nextArgs);
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

let _curry = (fn, arity = fn.length) =>
  (function nextCurried(prevArgs) {
    return (...nextArgs) => {
      let args = prevArgs.concat(nextArgs);
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);

//反柯里化

function uncurry(fn) {
  return function uncurried(...args) {
    var ret = fn;

    for (let i = 0; i < args.length; i++) {
      ret = ret(args[i]);
    }
    return ret;
  };
}

function add(...args) {
  return args;
}

let ov = _curry(add, 3);

console.log(ov(2, 3)(6), "ov");
let unc = uncurry(ov);
console.log(unc(2)(3)(6), "unc");
// console.log(arr, 'arr')

function unarr(fn) {
  return function onlyOneArg(arg) {
    return fn(arg);
  };
}
let arr1 = [1, 2, 3].map(parseFloat);
let arr2 = [1, 2, 3].map(unarr(parseInt));

console.log(arr1, arr2);

//
function partialProps(fn, prevObj) {
  return function partiallyApplied(lastObj) {
    return fn({
      ...prevObj,
      ...lastObj
    });
  };
}

function curryProps(fn, arity = 2) {
  return (function nextCurried(prevObj) {
    return function curried(nextObj = {}) {
      let [key] = Object.keys(nextObj);
      let args = {
        ...prevObj,
        [key]: nextObj[key]
      };

      if (Object.keys(args).length >= arity) {
        return fn(args);
      } else {
        return nextCurried(args);
      }
    };
  })({});
}

function partiaFoo({ x, y } = {}) {
  return [x, y];
}

console.log(
  partialProps(partiaFoo, {
    x: 123
  })({
    y: 122
  })
);
console.log(
  curryProps(partiaFoo)({
    y: 122
  })({
    yx: 1288
  })
);

//柯里化
let curryOfJ = (fn, ...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...lastArgs) => curryOfJ(fn, ...args, ...lastArgs)

function add6(a, b, c) {
  return a + b + c
}
let juejin_test = curryOfJ(add6, 3);
console.log(juejin_test(1, 6), "add6");