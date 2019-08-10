console.log('transducing')
//transducing就是通过减少来转换

var words = ['You', 'have', 'written', 'something', 'very', 'interesting']

function curry(fn, len = fn.length) {
  return (function curried(arr) {
    return function (...args) {
      let Args = [...arr, ...args]
      if (Args.length >= len) return fn(...Args)
      return curried(Args)
    }
  })([])
}

function compose(...fns) {
  let [fn1, fn2, ...rest] = fns.reverse()

  function composed(...args) {
    return fn2(fn1(...args))
  }

  if (!rest.length) return composed
  return compose(...rest.reverse(), composed)
}

function isLongEnough(str) {
  return str.length >= 5
}

function isShortEnough(str) {
  return str.length <= 10
}

function strUppercase(str) { return str.toUpperCase() }

function strConcat(str1, str2) { return str1 + str2 }

// 把Map/Filter 表示为Reduce
function strUppercaseReducer(list, str) {   //Map
  // list.push(strUppercase(str))
  // return list

  return list.concat([strUppercase(str)])
}

function isLongEnoughReducer(list, str) { //Filter
  // if (isLongEnough(str)) list.push(str)

  if (isLongEnough(str)) return list.concat([str])
  return list
}

function isShortEnoughReducer(list, str) {  //Filter
  // if (isShortEnough(str)) list.push(str)

  if (isShortEnough(str)) return list.concat(str)
  return list
}

console.log(
  words
    .reduce(strUppercaseReducer, [])
    .reduce(isLongEnoughReducer, [])
    .reduce(isShortEnoughReducer, [])
    .reduce(strConcat, "")
)

//但是仍然不能compose这四个reduce 因为他们接受两个参数而不是一个

//除了使用不同的断言函数之外 两个filter reducers几乎相同 参数化得到一个工具函数
// function filterReducer(predicateFn) { 3
function filterReducer(predicateFn, combinationFn) {
  return function reducer(list, val) {
    // if (predicateFn(val)) return list.concat([val]) 1
    // if (predicateFn(val)) return listCombination(list, val) 2
    if (predicateFn(val)) return combinationFn(list, val)
    return list
  }
}

var isLongEnoughReducer2 = filterReducer(isLongEnough)
var isShortEnoughReducer2 = filterReducer(isShortEnough)

//mapperFn 也参数化处理
// function mapReducer(mapperFn) { 3
function mapReducer(mapperFn, combinationFn) {
  return function reducer(list, val) {
    // return list.concat([mapperFn(val)]) 1
    // return listCombination(list, mapperFn(val)) 2
    return combinationFn(list, mapperFn(val))
  }
}

var strToUppercaseReducer = mapReducer(strUppercase)

//提取公用组合逻辑
// return list.concat(...) 或者 return list

function listCombination(list, val) {
  return list.concat([val])
}

// 使用这种形式的辅助函数
var curriedMapReducer = curry(mapReducer)
var curriedFilterReducer = curry(filterReducer)

var x = curriedMapReducer(strUppercase)
var y = curriedFilterReducer(isLongEnough)
var z = curriedFilterReducer(isShortEnough)

console.log(words.reduce(z(y(x(listCombination))), []), 'arr')

/**
 * 因为reducer的形状和combinationFn的形状是一样的
 * 换句话说 reducer可以作为另一个reducer的组合函数
 * 他们就是这样组合起来的
 * listCombination函数作为第一个reducer的组合函数 这个reducer又可以作为下一个reducer的组合函数 以此类推
 * */

//使用compose进行组合
let transducer = compose(
  curriedMapReducer(strUppercase),
  curriedFilterReducer(isLongEnough),
  curriedFilterReducer(isShortEnough)
)



console.log(words.reduce(transducer(listCombination), []), 'arr2')

//composition是一个组合函数 期望组合函数来形成一个reducer 
//而这个composition有一个特殊的标签 transducer 
//给transducer提供组合函数 产生组合的reducer

console.log(
  words
    .reduce(transducer(listCombination), [])
    .reduce(strConcat, ''),
  'arr3'
)

//strConcat是一个组合函数！！
//这意味着如果我们的最终目标是获得一个字符串 而不是一个数组
//我们就可以用它替代listCombination
console.log(words.reduce(transducer(strConcat), ''), 'arr4')
// 这就是transducing!!

/**
 * 现在将注意力转移到如何在我们的程序中使用转换 
 * 为了方便理解 重新定义我们之前定义的辅助函数
 */

let transducerMap = curry(function (mapperFn, combinationFn) {
  return function reducer(list, val) {
    return combinationFn(list, mapperFn(val))
  }
})

let transducerFilter = curry(function (predicateFn, combinationFn) {
  return function reducer(list, val) {
    if (predicateFn(val)) return combinationFn(list, val)
    return list
  }
})

//还记得我们这样使用它
let transducer2 = compose(
  transducerMap(strUppercase),
  transducerFilter(isLongEnough),
  transducerFilter(isShortEnough)
)

/**
 * transducer依然需要一个组合函数 (如 strConcat 或 listCombination）
 * 来产生一个传递给reduce（连同初始值）的transducer-reducer函数
 */

//为了更好的表达所有的转换步骤 我们做一个transduce工具来为我们做这些步骤

function transduce(transducer, combinationFn, initialValue, list) {
  let reducer = transducer(combinationFn)
  return list.reduce(reducer, initialValue)
}

console.log(transduce(transducer2, strConcat, '', words), 'arr5')
console.log(transduce(transducer2, listCombination, [], words), 'arr6')

//transducers-js 一个transducing库

/**
 * 总结
 * transducer是组合的reducer
 * 我们使用转换来组合相邻的 map filter reduce 操作 
 * 首先将map filter表示为reduce 然后抽象出常用的组合操作来创建一个容易组合的一致的reducer生产函数
 * 
 */