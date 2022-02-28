// 3.4.7 Symbol类型

// 1、符号的基本使用
(() => {
    let sym = Symbol();
    console.log('sym---', sym, typeof sym);
    let firstSym = Symbol();
    let secondSym = Symbol();

    let thirdSym = Symbol('foo');
    let fourthSym = Symbol('foo');
    console.log('firstSym', firstSym);
    console.log('thirdSym', thirdSym);
    console.log('firstSym == secondSym', firstSym == secondSym);
    console.log('thirdSym == fourthSym', thirdSym == fourthSym);

    // 不能作为构造器函数与new 一起使用,为了避免创造符号包装对象
    let myBoolean = new Boolean();
    let myString = new String();
    let myNumber = new Number();
    console.log('typeof ----', typeof myBoolean, typeof myString, typeof myNumber);
    // let mySymbol = new Symbol();
    // console.log('symbl Typeof', typeof mySymbol);    // TypeError: Symbol is not a constructor
    // 要创建符号包装对象的方法
    let mySymbol = Symbol();
    let myWrapperSymbo = Object(mySymbol);
    console.log('typeof mySymbol', typeof myWrapperSymbo);
});

// 2、使用全局符号注册表
(() => {
    let globalSymbol = Symbol.for('foo');   // 创建新符号
    console.log('typeof globalSymbol', typeof globalSymbol, globalSymbol);
    let otherSymbol = Symbol.for('foo');    // 重用已有符号 foo
    console.log('golbalSymbl == otherSumbol', globalSymbol == otherSymbol);
    console.log('golbalSymbl === otherSumbol', globalSymbol === otherSymbol);
    // Symbol.for() 中传入的必须是字符串，不是字符串换转为字符串
    let emptySymbol = Symbol.for();
    console.log('emptySymbol', emptySymbol);    // Symbol(undefined)
    // 可以使用 Symbol.keyFor() 查找全局注册表  传入的必须是被声明的符号 
    let s = Symbol('foo');
    console.log('Symbol.keyFor()', Symbol.keyFor(otherSymbol), Symbol.keyFor(s));   // foo undefined
    // console.log('Symbol.keyFor(123)', Symbol.keyFor(123));   // TypeError: 123 is not a symbol
});

// 3、使用符号作为属性
(() => {
    let s1 = Symbol('foo'),
        s2 = Symbol('bar'),
        s3 = Symbol('bat'),
        s4 = Symbol('qwe');
    let o = {
        a: 'a val',
        [s1]: 'foo val'
    };
    // o[s1] = 'foo val'
    console.log('o--1--', o);
    // Object.defineProperty 和 Object.defineProperties
    Object.defineProperty(o, s2, {
        value: 'bar val'
    });
    console.log('o--2--', o);
    Object.defineProperties(o, {
        [s3]: { value: 'bat val' },
        [s4]: { value: 'qwe val' }
    })
    console.log('o--3--', o);
    // 通过 Object.getOwnPropertyNames() 和 Object.getOwnPropertySymbols() 获取属性
    console.log('Object.getOwnPropertyNames(o)', Object.getOwnPropertyNames(o));
    console.log('Object.getOwnPropertySymbols(o)', Object.getOwnPropertySymbols(o));
    // 两者互斥 前者只能获取常规数据数组，后者只能获取符号数组
    // 想要同时获取需要使用 Object.getOwnPropertyDescriptors(o) 获取详情
    console.log('Object.getOwnPropertyDescriptors(o)', Object.getOwnPropertyDescriptors(o));
    // Reflect.ownKeys() 会返回两种类型的键
    console.log('Reflect.ownKeys(o)', Reflect.ownKeys(o));

    // 符号可以不显示声明，直接创建被使用
    let m = {
        [Symbol('foo')]: 'foo val',
        [Symbol('bat')]: 'bat val'
    };
    console.log('m---', m);
    // 但是要找到使用直接创建的符号的属性key 必须遍历整个对象下面的符号键数组对应找到
    let batSymbol = Object.getOwnPropertySymbols(m).find(e => {
        return e.toString().match(/bat/);
    });
    console.log('batSymbol--', batSymbol);
});

// 4、常用内置符号
(() => {
    // ECMA script 6 引入了一批常用内置符号(we-known symbol),用于暴露语言内部行为，开发者可以直接访问】充血或模拟这些行为。
    // 这些符号都是以 Symbol工厂函数字符串属性的形式存在。
    // for of 会循环对象上使用symbol.iterator属性，可以自定义对象上的Symbol.iterator的值来改变for of的迭代该对象的行为。
    // 内置符号属性都是不可写、不可枚举、不可配置的
    // ECMA script 6中应用符号在规范中的名称 @@iterator 指的就是 Symbol.iterator
    // 当使用for of 时， 调用Symbol.iterator返回对象
    class Obj {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        [Symbol.iterator]() { return this; }
        next() {
            var value = this.x;
            if (value < this.y) {
                this.x++;
                return { value: this.x, done: false };
            } else {
                return { value: undefined, done: true }
            }
        }
    }
    let obj = new Obj(1, 5);
    for (let i of obj) {    // TypeError: obj is not iterable
        console.log('i----', i);    
    }
});

// 5、Symbol.asyncIterator (表示实现异步迭代器API的函数)
/**
 * 根据ECMA script规范，这个符号作为一个属性表示： 
 * 一个方法，该方法返回对象默认的AsyncIterator。由for-wait-of语句使用
 *  */ 
(() => {
// for-wait-of循环会利用这个函数执行异步迭代操作，循环时他们会调用Symbol.asyncIterator为键的函数
// 并期望这个函数会返回一个实现迭代器API的对象，很多时候返回的对象是该API的AsyncGenertor:
class Foo {
    async *[Symbol.asyncIterator]() {}
}
let f = new Foo();
console.log('Symbol.syncIterator()', f[Symbol.asyncIterator]());    // AsyncGenerator {<suspended>}

// 技术上，这个是有Symbol.asyncIterator函数生成的对象 应该可以通过其next()方法陆续返回Promise实例。可以通过显示的调用next()方法返回，也可以隐式地通过一部生成函数返回：
// 注：Symbil.syncIterator是ES2018规范定义的，因此只有版本非常新的浏览器才能支持它
class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }
    async * [Symbol.asyncIterator]() {
        while(this.asyncIdx < this.max) {
            yield new Promise(resolve => resolve(this.asyncIdx++));
        }
    }
}
async function asyncCount() {
    let emitter = new Emitter(3);
    for await(const x of emitter) {
        console.log('emitter----x', x);
    }
}

asyncCount();  
// 0
// 1
// 2
})();