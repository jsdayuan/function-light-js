"use strict"

var pipe = reserveArgs(compose)

// list

var map = unboundMethod('map', 2)
var filter = unboundMethod('filter', 2)
var reduce = unboundMethod('reduce', 3)
var each = unboundMethod('forEach', 2)
var flatMap = curry((mapperFn, arr) => {
  return arr.reduce((list, v) => {
    return list.concat(mapperFn(v))
  }, [])
})

function filterOut(predicateFn, arr) {
  return filter(not(predicateFn), arr)
}

function unary(fn) {
  return function onlyOneArg(arg) {
    fn(arg)
  }
}

function not(predicate) {
  return function (...args) {
    return !predicate(...args)
  }
}

function reserveArgs(fn) {
  return function (...args) {
    return fn(...args.reverse())
  }
}

function spreadArgs(fn) {
  return function (argsArr) {
    return fn(...argsArr)
  }
}

function partial(fn, ...prevArgs) {
  return function (...lastArgs) {
    return fn(...prevArgs, ...lastArgs)
  }
}

function partialRight(fn, ...lastArgs) {
  return function (...prevArgs) {
    return fn(...prevArgs, ...lastArgs)
  }
}

function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function (...lastArgs) {
      let args = [...prevArgs, ...lastArgs]
      if (args.length >= arity) return fn(...args)
      return nextCurried(args)
    }
  })([])
}

function uncurry(fn) {
  return function (...args) {
    let ret = fn;

    for (let i = 0; i < args.length; i++) {
      ret = ret(args[i])
    }

    return ret
  }
}

function zip(arr1, arr2) {
  let zipped = [];
  arr1 = [...arr1]
  arr2 = [...arr2]

  while (arr1.length && arr2.length) {
    zipped.push([arr1.shift(), arr2.shift()])
  }
  return zipped
}

function compose(...fns) {
  let [fn1, fn2, ...rest] = fns.reverse()
  let composed = function (...args) {
    return fn2(fn1(...args))
  }
  if (!rest.length) {
    return composed
  }
  return compose(...rest.reverse(), composed)
}

function prop(name, obj) {
  return obj[name]
}

function setProp(name, obj, value) {
  let newObj = { ...obj }
  newObj[name] = value;
  return newObj
}

function unboundMethod(methodName, arity) {
  return curry((...args) => {
    let obj = args.pop()
    return obj[methodName](...args)
  }, arity)
}






