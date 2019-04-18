console.log('start')

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true,
    get: function () {
      console.log('get');
      return val;
    },
    set: function (newVal) {
      // 设置时，可以添加相应的操作
      console.log('set');
      val += newVal;
    }
  });
}
// let obj = {
//   name: '成龙大哥',
//   say: '：其实我之前是拒绝拍这个游戏广告的，'
// };
// Object.keys(obj).forEach(k => {
//   defineReactive(obj, k, obj[k]);
// });
// obj.say = '后来我试玩了一下，哇，好热血，蛮好玩的';
// console.log(obj.name + obj.say);
// console.log(obj);
// // 成龙大哥：其实我之前是拒绝拍这个游戏广告的，后来我试玩了一下，哇，好热血，蛮好玩的
// obj.eat = '香蕉'; // ** 没有响应


// proxy
let obj2 = {};
// 代理 obj
let handler = {
  get: function (target, key, receiver) {
    console.log('get', key);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log('set', key, value);
    return Reflect.set(target, key, value, receiver);
  },
  deleteProperty(target, key) {
    console.log('delete', key);
    delete target[key];
    return true;
  }
};
// let data = new Proxy(obj2, handler);
// 代理后只能使用代理对象 data，否则还用 obj 肯定没作用
// console.log(data.name); // get name 、undefined
// data.name = '尹天仇'; // set name 尹天仇
// delete data.name; // delete name

// let arr = ['尹天仇', '我是一个演员', '柳飘飘', '死跑龙套的'];
// let array = new Proxy(arr, handler);
// array[1] = '我养你啊'; // set 1 我养你啊
// array[3] = '先管好你自己吧，傻瓜。'; // set 3 先管好你自己吧，傻瓜。

//手写promise
Function.prototype.bind2 = function (self, ...args) {
  let fn = this

  let resFun = function (...lastArgs) {
    return fn.apply(self, [...args, ...lastArgs])
  }
  let tmp = function () {}
  tmp.prototype = fn.prototype
  resFun.prototype = new tmp()
  return resFun
}

function Promise2(constructor) {
  this.state = 'pind'
  this.resolveState = ""
  this.rejectState = ""
  try {
    constructor(this.resolve.bind2(this), this.reject)
  } catch (error) {

  }
}

Promise2.prototype.resolve = function (v) {
  console.log(this.state, 'thisss')
  if (this.state === 'pind') {
    this.state = 'res'
    this.resolveState = v
    console.log(v, 'thisss')
  }
}
Promise2.prototype.reject = function (e) {
  if (this.state === 'pind') {
    this.state = 'rej'
    this.rejectState = e
  }
}
Promise2.prototype.then = function (res, rej) {
  console.log(this, 't')
  if (this.state === 'res') {
    res(this.resolveState)
  }
  if (this.state === 'rej') {
    rej(this.rejectState)
  }
}

let test = new Promise2((res, rej) => {
  let a = 1
  if (a === 1) {
    res(a)
  } else {
    rej('err')
  }
}).then(res => {
  console.log(res, 'res test')
})


// proxy实现观察者模式
class Dep {
  constructor() {
    this.subs = new Set();
    // Set 类型，保证不会重复
  }
  addSub(sub) { // 添加订阅者
    this.subs.add(sub);
  }
  notify(key) { // 通知订阅者更新
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}
class Watcher { // 观察者
  constructor(obj, key, cb) {
    this.obj = obj;
    this.key = key;
    this.cb = cb; // 回调
    this.value = this.get(); // 获取老数据
  }
  get() { // 取值触发闭包，将自身添加到dep中
    Dep.target = this; // 设置 Dep.target 为自身
    console.log(Dep.target, 'dep')
    let value = this.obj[this.key];
    Dep.target = null; // 取值完后 设置为nul
    return value;
  }
  // 更新
  update() {
    let newVal = this.obj[this.key];
    if (this.value !== newVal) {
      this.cb(newVal);
      this.value = newVal;
    }
  }
}

function Observer(obj) {
  Object.keys(obj).forEach(key => { // 做深度监听
    if (typeof obj[key] === 'object') {
      obj[key] = Observer(obj[key]);
    }
  });
  let dep = new Dep();
  let handler = {
    get: function (target, key, receiver) {
      console.log(Dep.target, 'Dep.target')
      Dep.target && dep.addSub(Dep.target);
      // 存在 Dep.target，则将其添加到dep实例中
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
      let result = Reflect.set(target, key, value, receiver);
      dep.notify(); // 进行发布
      return result;
    }
  };
  return new Proxy(obj, handler)
}

let data = {
  name: '渣渣辉'
};

function print1(data) {
  console.log('我系', data);
}

function print2(data) {
  console.log('我今年', data);
}
data = Observer(data);
new Watcher(data, 'name', print1);
// data.name = '杨过'; // 我系 杨过

new Watcher(data, 'age', print2);
// data.age = '24'; // 我今年 24

//dep 依赖收集
class Dep2 {
  constructor() {
    this.sub = new Set()
  }
  addSub(sub) {
    this.sub.add(sub) //添加订阅者
  }
  notify(key){
    this.sub.forEach(v=>{
      v.update()   //通知订阅者更新
    })
  }
}

class Watcher2 {
  constructor(a) {
    this.a = a
  }
  get() {
    console.log('get')
  }
}

new Watcher2('a')