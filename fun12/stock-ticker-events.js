
/**
 * 数据格式 [{id:AApl,price:121.7,change:0.01}]
 */


function addStockName(stock) {
  return setProp('name', stock, stock.id)
}

function formatSign(val) {  //Sign
  if (Number(val) > 0) {
    return `+${val}`
  }
  return val
}

function formatCurrency(val) {  //Currency
  return `$${val}`
}

function transformObservable(mapperFn, obsv) {
  return obsv.map(mapperFn)
}

var formatDecimal = unboundMethod('toFixed')(2)
var formatChange = pipe(formatDecimal, formatSign)
var formatPrice = pipe(formatDecimal, formatChange)
var processNewStock = pipe(addStockName, formatStockNumbers)

function formatStockNumbers(stock) {
  let updateTuples = [
    ['price', formatPrice(stock.price)],
    ['change', formatChange(stock.change)]
  ]

  return reduce((stock, [propName, val]) => {
    return setProp(propName, stock, val)
  })(stock)(updateTuples)
}