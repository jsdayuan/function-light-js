function foo() {
  let fn = (msg) => {
    console.log(msg)
  }
  bao(fn)
}

function bao(callback) {
  callback(123)
}
foo()

//---------------------

// function foo2(fn) {
//   return str => fn(str)
// }

let foo2 = fn => str => fn(str)

// function foofn1(s) {
//   return s.toLowerCase()
// }
let foofn1 = s => s.toLowerCase()

// function foofn2(s) {
//   return s[0].toUpperCase() + s.slice(1).toLowerCase()
// }
let foofn2 = s => s[0].toUpperCase() + s.slice(1).toLowerCase()

let name = foo2(foofn1)
let name2 = foo2(foofn2)

console.log(name('dayuAn'))
console.log(name2('dayuan'))

//

const frit = res => num => {
  let arrs = [...res, num]
  return arrs
}

Promise.resolve([123, 423, 234]).then(frit).then(res2 => console.log(res2(8)))