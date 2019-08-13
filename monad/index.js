console.log('monad')

/**
 * monad很有用 也非常流行
 * 一个monad（仅仅是自函子）范畴中的一个monoid ❌ 故弄玄虚 华而不实
 *
 * 在函数式编程中有一个巨大的兴趣领域 类型论 该教程完全远离了该领域 等以后会接触到并且要深入了解的
 *
 * monad基本上是一个值类型
 * 
 * 数字42有一个值类型(number) 它带有我们依赖的特征和功能 
 * 字符串‘42’可能看起来很想 但在编程里它有不同的用处
 * 
 * 在面向对象编程 当你有一组数据 并且想给他绑上一些行为  那么你将创建一个对象或者类来表示‘type’
 * 接着实例就完成了该类型的一员 这种做法通常被称为数据结构
 * 
 * monad是一种数据结构  是一种类型  它是一组使处理某个值变得可预测的行为
 *
 * 特殊的数据结构
 */

//Maybe Monad
//Maybe Monad是另外两个更简单的Monad的搭配 Just Nothing

function Just(val) {
  return { map, chain, ap, inspect }

  //*********************************** */
  function map(fn) { return Just(fn(val)) }
  function chain(fn) { return fn(val) }
  function ap(anotherMethod) { return anotherMethod.map(val) }

  function inspect() {
    return `Just ${val}`
  }
}

function Nothing() {
  return { map: Nothing, chain: Nothing, ap: Nothing, inspect }

  //***************************************** */
  function inspect() {
    return Nothing
  }
}

//任何含有Just和Nothing的Monad都含有map和chain方法 又称（bind或者flatMap）和ap方法
//这些方法及其行为的目的在于提供多个Monad实例一起工作的标准化方法

//Maybe这个抽象概念的作用是隐式的封装了操作和无操作的二元性

let Maybe = { Just, Nothing, of: Just }

//Monad是一个值类型 一个接口 一个有封装对象的数据结构
//Monad是一个用更具有声明式的方式围绕一个值来组织行为的方法
