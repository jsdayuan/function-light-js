function curry(fn,arity=fn.length){
  return (function nextCurried(prevArgs){
    return function(...lastArgs){
      let args=[...prevArgs,...lastArgs]
      if(args.length>=arity) return fn(...args)
      return nextCurried(args)
    }
  })([])
}