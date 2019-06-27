console.log('hello f')

var users = {}
var userOrders = {}

function fetchUserData(userId) {
  ajax('url' + userId, userData => {
    users[userId] = userData
  })
}

function fetchOrders(userId) {
  ajax('url' + userId, orders => {
    for (let i = 0; i < orders.length; i++) {
      users[userId].latestOrder = orders[i]
      userOrders[orders[i].orderId] = orders[i]
    }
  })
}

function deleteOrder(orderId) {
  var user = users[userOrders[orderId].userId];
  var isLatestOrder = (userOrders[orderId] == user.latestOrder)

  //删除用户的最新订单？
  if (isLatestOrder) {
    hideLatestOrderDisplay()
  }

  ajax('url' + orderId, success => {
    if (success) {
      if (isLatestOrder) {
        user.latestOrder = null;
      }

      userOrders[orderId] = null
    } else if (isLatestOrder) {
      showLatestOrderDisplay()
    }
  })
}

//如果fetchOrders的callback在fetchUserData的callback前运行 就会出现问题 这种情况下要确保异步任务的执行顺序

// 数学中的幂等 在第一次调用后 如果你将该输出一次又一次的输入到操作中 其输出永远不会改变的操作 
// 例如 foo(x) 和 foo(foo(x)) .. 等 将产生相同的输出

//编程中的幂等 f(x) 的结果与 f(x) f(x)的结果相同 换句话说就是f(x)不管调用多少次 其输出值都是相等的

//幂等的
let a = [];
let obj = {}
Object.count = 2;
a[a.length - 1] = 42

//非幂等的
obj.count++;
a[a.length] = 42

//没有任何副作用的函数称为纯函数 纯函数是一种幂等函数
//如果一个函数每次在给予相同的输入时 可能产生不同的输出

//这里要注意下javascript的引用值类型

// function rememberNumbers(nums) {
//   return function (fn) {
//     return fn(nums)
//   }
// }

let list = [1, 2, 3]

var simpleList = rememberNumbers(list)

function median(nums) {
  return (nums[0] + nums[nums.length - 1]) / 2
}

simpleList(median)//2
list.push(5)
simpleList(median)//3

//解决方法1 通过修改rememberNumbers 拷贝一份nums
function rememberNumbers(nums) {
  let copyNums = [...nums]
  return function (fn) {
    return fn(copyNums)
  }
}

//如果副作用的本质是使用词法自由变量 并且可以修改周围的代码 可以使用作用域来封装他们 例如

let users2 = {}
function fetchUsersData(userId) {
  ajax(url + userId, data => {
    user[userId] = data
  })
}

function safer_fetchUserData(userId, users) {
  users = { ...users }

  fetchUsersData(userId)

  return users

  function fetchUsersData(userId) {
    ajax(url + userId, data => {
      user[userId] = data
    })
  }
}

//批量删除
function batchDel(arr, delArr) {
  let _arr = [...arr]
  for (let i = 0; i < delArr.length; i++) {
    _arr.splice(delArr[i] - i, 1)
  }
  return _arr
}

console.log(batchDel([1, 2, 3, 4, 5], [2, 3]))




