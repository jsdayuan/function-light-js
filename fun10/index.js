"use strict";

console.log('递归')

function fib(x) {
  if (x <= 1) return x
  return fib(x - 2) + fib(x - 1)
}
//二分递归查找
console.log(fib(2))

//相互递归 两个及以上函数相互调用
function fib_2(n) {
  if (n == 1) return 1
  else return fib2(n - 2)
}

function fib2(n) {
  if (n == 0) return 0
  else return fib2(n - 1) + fib_2(n)
}
console.log(fib2(2))

function sum(total, ...nums) {
  for (let i = 0; i < nums.length; i++) {
    total = total + nums[i]
  }
  return total
}

//vs


function sum2(num1, ...nums) {
  if (nums.length === 0) return num1
  return num1 + sum2(...nums)
}

// 尾递归优化  return sum(result,...nums)

function createArray() {
  let arr = []
  for (let i = 0; i < 1000; i++) {
    arr.push(i)
  }
  return arr
}
let arr = createArray()

function sum2Optimize(result, num) {
  result = result + num--
  if (num === 0 || !num) return result
  return sum2Optimize(result, num)
}

// sum2(...createArray())  //这样就会内存溢出 导致报错

console.log(sum2Optimize(0, 10000), '尾递归')

//为解决尾递归后需多传递一个参数
function placeSum(num) {
  return sum2Optimize(0, num)
}

console.log(placeSum(10000), '尾递归包装第一次')

let placeSum2 = (function () {
  return function (num) {
    return sum(0, num)
  }
  function sum(result, num) {
    result = result + num--
    if (num === 0) return result
    return sum(result, num)
  }
})()

console.log(placeSum2(10000), '尾递归包装第二次')