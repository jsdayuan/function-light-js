console.log('列表操作')

function unip(fn) {
  return function (arg) {
    return fn(arg)
  }
}

console.log([1, 2, 3].map(unip(parseInt)))

let arr = [1, 2, 3, 2]
let unique = arr => arr.filter((v, index) => arr.indexOf(v) == index)
console.log(unique(arr))

//map
function Map(fn, arr) {
  let list = []
  arr.forEach((val, index) => {
    list.push(fn(val, index, arr))
  })
  return list
}
console.log(Map(v => v * 2, arr), 'map')

//filter
function Filter(fn, arr) {
  let list = []
  arr.forEach((val, index) => {
    fn(val, index, arr) ? list.push(val) : ''
  })
  return list
}
console.log(Filter(v => v == 2, arr), 'filter')
//reduce
function Reduce(fn, arr, initVal) {
  let acc, startIndex;
  if (initVal !== undefined) {
    acc = initVal;
    startIndex = 0
  } else {
    acc = arr[0];
    startIndex = 1
  }
  for (let i = startIndex; i < arr.length; i++) {
    acc = fn(acc, arr[i], i, arr)
  }
  return acc
}
console.log(Reduce((def, v) => v * def, 2, arr), 'reduce')

var margeReducer = (merged, v, idx) => merged.slice(0, idx * 2).concat(v, merged.slice(idx * 2))
console.log([1, 3, 5, 7, 9].reduce(margeReducer, [2, 4, 6, 8, 10]))

//操作列表
function isOdd(arr) {
  return arr.filter(val => val % 2 == 0)
}

function double(arr) {
  return arr.reduce((newArr, val) => {
    newArr.push(val * 2);
    return newArr
  }, [])
}

function sum(arr) {
  return arr.reduce((prev, last) => prev + last, 0)
}

let testArr = [1, 2, 3, 4]

function compose(...fns) {
  let [fn1, fn2, ...rest] = fns.reverse()
  let computed = (...firstArgs) => fn2(fn1(...firstArgs))
  return rest.length ? compose(...rest.reverse(), computed) : computed
}

console.log(compose(sum, double, isOdd)(testArr))
console.log(testArr)
