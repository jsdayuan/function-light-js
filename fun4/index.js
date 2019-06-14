// 回顾形参
// 提供api ajax(url,params,cb)  partial(偏函数)
function ajax(url, params, cb) {

}

function partial(fn, ...defArgs) {
  return function (...args) {
    fn(...defArgs, ...args)
  }
}

var getPerson = partial(ajax, 'http://person')
var getLastOrder = partial(ajax, 'http://order', { id: 1 })

getLastOrder(function (order) {
  getPerson({ id: order.id }, function (person) {
    output(person)
  })
})
//移除order和order参数的引用

var prop = (name, obj) => obj[name]

function setProp(name, obj, val) {
  let o = { ...obj }
  o[name] = val
  return o
}

var extractName = partial(prop, 'name')
//创建一个等待接受包含name属性的对象的函数

getLastOrder(function (order) {
  getPerson({ id: order.id }, outputPersonName)
})

//接下来定义outputPersonName

function compose(...fns) {
  let [fn1, fn2, ...rest] = fns.reverse()
  function def(...args) {
    return fn2(fn1(...args))
  }
  if (!rest.length) return def
  compose(...rest.reverse(), def)
}

var outputPersonName = compose(output, extractName)

function partialRight(fn, ...lastArgs) {
  return function (...prevArgs) {
    fn(...prevArgs, ...lastArgs)
  }
}
var processPerson = partialRight(getPerson, outputPersonName)

getLastOrder(function (order) {
  processPerson({ id: order.id })
})

var extractParsonId = partial(prop, 'id')

function makeObjProp(name, value) {
  return setProp(name, {}, value)
}

var personData = partial(makeObjProp, 'id')

var lookupPerson = compose(processPerson, personData, extractParsonId)

getLastOrder(lookupPerson)

//函数组合是一种函数的模式，它能将一个函数调用输出 路由 到另一个函数的调用上，然后一直进行下去。
// 因为js函数只能返回单个值，这个模式本质上要求所有组合中的函数（除去第一个调用的函数）是一元的，当前函数从上一个函数输出中只接受一个输入


