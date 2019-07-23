console.log('闭包vs对象')
function outer() {
  var one = 1;
  var two = 2;
  return function () {
    return one + two
  }
}

let three1 = outer()
three1()

let obj = {
  one: 1,
  two: 2
}

function three2(outer) {
  return outer.one + outer.two
}

three2(obj)

function foo() {
  let a = 1;
  let b = 2
  return fooChildren
  function fooChildren() {
    console.log(a + b)
  }
}
let testScope = foo()
console.log(testScope, testScope.prototype)

//闭包和对象之间是同构的 
//可以从两者中的任意一方转化到另一方 并且无论怎样都保持了相同的特性

let asd = () => {
  console.log(this, '1')
}

function StudentRecord(name, major, gpa) {
  return function printStudent() {
    return `${name}nMajor:${major},GPA:${gpa.toFixed(1)}`
  }
}

var student = StudentRecord('Kule Simpson', 'CS', 4)

student()

//弹簧床
function t(fn){
   return function ted(...args){
      let result =fn(...args)

      while(typeof result=='function'){
        result=result()
      }

      return result
   }
}
