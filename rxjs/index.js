import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

const app = document.getElementById('app');

let btn = document.createElement('button')
btn.innerText = "click me"

Observable.fromEvent(btn, 'click').subscribe(_ => console.log("Clicked"))

app.appendChild(btn)

//  生产者
let a = new Subject()

setTimeout(_ => {
  a.next(2)
}, 1000)

// 消费者
let b = a.map(v => v * 2).subscribe(v => console.log(v, 'subscribe'))


