import qrCodeJs from "qrcodejs2"

let dom = document.getElementById('qrCodeUrl')
let i = 1
function init() {
  var qrcode = new qrCodeJs(dom, {
    width: 100,
    height: 100,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: qrCodeJs.CorrectLevel.H
  })
  qrcode.makeCode(`https://www.baidu.com/${i++}`);
}
init()

// 上面是练习二维码
//什么是副作用
//1.输出和状态的变化是最常被引用的副作用的表现
function bar(x) {
  y = x + 1
}


// 掘金AOP思想学习 原函数
var takePhoto = function () {
  console.log('拍照片');
}
// 定义 aop 函数
var after = function (fn, afterfn) {
  return function () {
    let res = fn.apply(this, arguments);
    afterfn.apply(this, arguments);
    return res;
  }
}
// 装饰函数
var addFilter = function () {
  console.log('加滤镜');
}
// 用装饰函数装饰原函数
takePhoto = after(takePhoto, addFilter);

takePhoto();

let test_fn = function () {
  console.log('拍照片2')
}

test_fn.children_fn = function () {
  console.log('手动添加children2')
}

test_fn()
test_fn.children_fn()
console.log(test_fn.prototype, 'test_fn')

//  使用Object definePropentr
Object.defineProperty(test_fn, 'after', {
  writable: true,
  value: function () {
    console.log('加滤镜2');
  },
});

Object.defineProperty(test_fn, 'before', {
  writable: true,
  value: function () {
    console.log('打开相机2');
  },
});

let aop = function (fn) {
  return function (...args) {
    fn.before()
    fn(...args)
    fn.after()
  }
}

test_fn = aop(test_fn)
test_fn()

//使用es7装饰器 需借助babel loader

// function after(target, key, desc) {
//   const { value } = desc;
//   desc.value = function (...args) {
//     let res = value.apply(this, args);
//     console.log('加滤镜3')
//     return res;
//   }
//   return desc;
// }

// class Test {
//   @after
//   takePhoto() {
//     console.log('拍照3')
//   }
// }

// let t = new Test()
// t.takePhoto()

//函数式编程 





