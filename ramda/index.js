const R = require('ramda')
console.log('ramda', R)

const l = console.log

// add
let add = R.add(1)(2)
l(add, 'add')

//mapIndex
const mapIndexed = R.addIndex(R.map);
let mapIdx = mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
l(mapIdx, 'mapIdx')

//adjust
let ajusr = R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd'])
l(ajusr, 'adjust')

//all
l(R.all(v => v === 1)([1, 1, 1]))

