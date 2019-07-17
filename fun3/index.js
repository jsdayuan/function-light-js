console.log('hello function')
console.log('hello function2')

function foo(x, y) {
  return function (z) {
    return x + y + z
  }
}

let as = [1, 2, 3].map(foo(6, 6))
console.log(as)

function xf(fn) {
  return fn(66)
}

let ax = xf(foo(5, 5))
console.log(ax, 'ax')

function words(str) {
  console.log(1)
  return String(str).toLowerCase().split(' ').filter(v => v)
}

function unique(list) {
  console.log(2)
  let uniqList = [];
  for (let i = 0; i < list.length; i++) {
    if (uniqList.indexOf(list[i]) === -1) {
      uniqList.push(list[i]);
    }
  }
  return uniqList
}
//使用这两个实用函数来分析文本字符串

let text = "to compose oof tO lls input"

let wordsFound = words(text)
let wordUser = unique(wordsFound)
console.log(wordUser, 'wordUser')

function compose(...fns) {
  return function (result) {
    let list = [...fns];
    while (list.length > 0) {
      result = list.pop()(result)
    }
    return result
  }
}
console.log(compose(unique, words)('12,12 132, 3213 aa lasl a a'))

function reduceCompose(...fns) {
  return function computed(result) {
    return fns.reverse().reduce((result, fn) => {
      return fn(result)
    }, result)
  }
}
console.log(reduceCompose(unique, words)('12,12 132, 3213 aa lasl a a'), 'reduce实现方式')

function opcompose(...fns) {
  let copyFns = [...fns]
  return function as(result) {
    let str = copyFns.pop()(result)
    if (copyFns.length) {
      return opcompose(...copyFns)(str)
    } else {
      return str
    }
  }
}
console.log(opcompose(unique, words)('12,12 132, 3213 aa lasl a a'), '递归实现方式')

// 修正第一次调用单参数限制
function compose5(...fns) {
  return fns.reverse().reduce((fn1, fn2) => {
    return function (...args) {
      return fn2(fn1(...args))
    }
  })
}

console.log(compose5(unique, words)('12,12 132, 3213 aa lasl a a'), '修正第一次调用单参数限制')

//  练习递归实现compose
function compose6(...fns) {
  let [fn1, fn2, ...rest] = fns.reverse()

  function composed(...args) {
    return fn2(fn1(...args))
  }
  if (!rest.length) return composed
  return compose6(...rest.reverse(), composed)

}

console.log(compose6(unique, words)('12,12 132, 3213 aa lasl a a'), '练习递归')



