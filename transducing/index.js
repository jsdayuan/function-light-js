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
  return function reducer (list, val) {
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


