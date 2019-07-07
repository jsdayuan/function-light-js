console.log('值的不可变性')
//幂等性是指定义一个数据变更操作以便只影响一次程序状态 现在将影响次数变为0

//可以将以拷贝代替改变的策略来应用于对象
function addValue(arr) {
  let copyArr = [...arr, 4]
  return copyArr
}

//常量 一个无法进行重新赋值的变量
//对于基本类型 倾向于使用const关键字来声明常量
//对于引用类型 倾向于使用Object.freeze 来将该值进行冻结 仅仅是将顶层进行冻结

function as() {
  function av() {
    console.log(av.prototype)
  }
  av()
}
as()
// console.log(c.prototype)

let arr = [{ a: 1 }, { a: 2 }, { a: 3 }]
arr.map(item => {
  item.a *= 2
})
console.log(arr)
