// 附录A

// A.1 异步迭代器
/**
 *  异步执行：用于释放对执行线程的控制以执行慢操作和收回控制
 *  迭代器协议：设计为任意对象定义规范顺序
 */

/**
 * 同步迭代器在每次调用next()时都会返回{ value, done }对象。当然，这个要求确定这个对象内容的计算和资源获取在next()调用退出时必须完成，否知值就无法确定。
 * 在使用同步迭代器切获迭代异步确定的值时，主线程会被阻塞，以等待异步操作完成。
 * 
 * 有了异步迭代器就可以解决这个问题
 * 异步迭代器在每次调用next()时会提供解决为{ value, done }对象的期约。这样，执行线程可以释放并在当前这步循环完成之前执行其他任务。
 */

(() => {
// A.1.1 创建并使用异步迭代器
// 最简单理解异步迭代器的方法是：与同步迭代器进行比较。
// Emitter类中 包含同步迭代器 
class Emitter1 {
    constructor(max) {
        this.max = max;
        this.syncInx = 0;
    }
    *[Symbol.iterator]() {
        while(this.syncInx < this.max) {
            yield this.syncInx++;
        }
    }
}

const emitter1 = new Emitter1(3);

function syncCount() {
    const asyncCounter = emitter1[Symbol.iterator]();
    for (const x of asyncCounter) {
        console.log('x-----', x);
    }
}

// syncCount();
// // x----- 0
// // x----- 1
// // x----- 2

/**
 * 已上例子可以运行主要是迭代器可以理解产生下一个值。假如你不想在确定下一个产生的值时阻塞主线程执行，也可以定义异步迭代器，让她产生期约包装的值。
 * 为此要使用迭代器和生成器的异步版本。
 * ECMA2018为此定义了Symbol.asyncIterator,一边定义个调用输出期约的生成器函数。这一规范还为异步迭代器增加了for-await-of循环用于使用异步迭代器
 */

// Emitter类中 包含同步迭代器、异步迭代器
class Emitter2 {
    constructor(max) {
        this.max = max;
        this.syncInx = 0;
        this.asyncInx = 0;
    }
    *[Symbol.iterator]() {
        while(this.syncInx < this.max) {
            yield this.syncInx++;
        }
    }
    // async *[Symbol.asyncIterator]() {
    //     while(this.asyncInx < this.max) {
    //         yield this.asyncInx++;
    //     }
    // }
    async *[Symbol.asyncIterator]() {
        while(this.asyncInx < this.max) {
            yield new Promise(resolve => resolve(this.asyncInx++));
        }
    }
}

const emitter2 = new Emitter2(3);

function sysConut1() {
    const asyncCounter = emitter2[Symbol.iterator]();
    for (const x of asyncCounter) {
        console.log('x1-----', x);
    }
}

async function asyncCount1() {
    const asyncCounter = emitter2[Symbol.asyncIterator]();
    for await (const x of asyncCounter) {
        console.log('x2-----', x);
    }
}

// sysConut1();
// // x1----- 0
// // x1----- 1
// // x1----- 2
// asyncCount1();
// // x2----- 0
// // x2----- 1
// // x2----- 2

// 若将同步迭代器传给for-await-of循环
async function asyncCount2() {
    const asyncCounter = emitter2[Symbol.iterator]();
    for await (const x of asyncCounter) {
        console.log('x3-----', x);
    }
}

// asyncCount2();
// // x3----- 0
// // x3----- 1
// // x3----- 2

// for-await-of循环可以流畅的处理同步和异步可迭代对象

// 若将异步迭代器传给for循环 
function sysConut2() {
    const asyncCounter = emitter2[Symbol.asyncIterator]();
    for (const x of asyncCounter) {
        console.log('x4----', x);
    }
}

// sysConut2();
// // TypeError: asyncCounter is not iterable

/**
 * 概念：Symbol.asyncIterator符号不会改变生成器函数的行为或者消费生成器的方式。
 * 上面的例子中，生成器函数加上了 async修饰符成为异步函数，又加上了星号成为生成器函数。
 * Symbol.asyncIterator在这只是起一个提示的作用，告诉将来消费这个迭代器的外部结构如for-await-of循环，这个迭代器会返回期约对象的序列
 */

});
(() => {
// A.1.2 理解异步迭代器队列

/**
 * 前面的例子是假象的，因为迭代器返回的期约都会立即解决，所以跟同步迭代器的区别很难看出来。
 * 想象下迭代器返回的期约会在不确定的时间解决，而且他们返回的顺序都是乱的。
 * 异步迭代器应该尽可能模拟同步迭代器，包括每次迭代时代码的按顺序执行。
 * 因此，异步迭代器会维护一个回调队列，以保障早期值得迭代器处理程序总是会在处理晚期之前完成，即使后面的值遭遇之前的值解决。
 */

// 为了验证队列，下面的例子中的迭代器函一随机时长返回期约。异步迭代队列可以保障期约解决的顺序不会干扰迭代顺序。结果应该按照顺序打印一组整租（但间隔时间随机）
class Emitter {
    constructor(max) {
        this.max = max;
        this.syncInx = 0;
        this.asyncInx = 0;
    }
    *[Symbol.iterator]() {
        while(this.syncInx < this.max) {
            yield this.syncInx++;
        }
    }
    async *[Symbol.asyncIterator]() {
        while(this.asyncInx < this.max) {
            yield new Promise(resolve => {
                setTimeout(() => {
                    resolve(this.asyncInx++);
                }, Math.floor(Math.random() * 1000));
            });
        }
    }
}

const emitter = new Emitter(5);

function syncCount() {
    const syncCounter = emitter[Symbol.iterator]();
    for (const x of syncCounter) {
        console.log('x1-----', x);
    }
}

async function asyncCount() {
    const asyncCounter = emitter[Symbol.asyncIterator]();
    for await (const x of asyncCounter) {
        console.log('x2-----', x);
    }
}

syncCount();
// x1----- 0
// x1----- 1
// x1----- 2
// x1----- 3
// x1----- 4

asyncCount();
// x2----- 0
// x2----- 1
// x2----- 2
// x2----- 3
// x2----- 4
});

(() => {
// A.1.3 处理异步迭代器的 reject()

/**
 * 因为异步迭代器使用期约来包装返回值，所以必须考虑某个期约被拒绝的情况。由于异步迭代会按顺序完成，而在循环中跳过被拒绝的期约是不合理的。因此，被拒绝的期约会强制退出迭代器
 */

class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncInx = 0;
    }
    async * [Symbol.asyncIterator]() {
        while(this.asyncInx < this.max) {
            if (this.asyncInx < 3){
                yield this.asyncInx++;
            } else {
                throw "Exited loop"
            }
        }
    }
}

const emitter = new Emitter(5);

async function asyncCount() {
    const asyncCounter = emitter[Symbol.asyncIterator]();

    for await(const x of asyncCounter) {
        console.log('x-----', x);
    }
}

asyncCount();
// x----- 0
// x----- 1
// x----- 2
// Uncaught (in promise) Exited loop
});


(() => {
// A.1.4 使用next() 手动迭代

/**
 * for-await-of提供了两个有用的特性。一：利用异步迭代器队列保证按顺序执行、二：隐藏异步迭代器的期约。但是使用者循环会隐藏很多底层的行为。
 * 因为异步迭代器仍遵守迭代器协议，所以可以使用next()逐个遍历异步可迭代对象。
 * next()返回的值包含一个期约，改期约可解决为{ value, done }这样的迭代结果。这意味着必须使用期约API获取方法，同时也意味着可以不使用异步迭代器队列。
 */
class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncInx = 0;
    }
    async *[Symbol.asyncIterator]() {
        while(this.asyncInx < this.max) {
            yield new Promise(resolve => resolve(this.asyncInx++));
        }
    }
}
const emitter = new Emitter(5);

const asyncCounter = emitter[Symbol.asyncIterator]();

console.log('asyncCounter.next()-----', asyncCounter.next());
// asyncCounter.next()----- Promise {<pending>}
});

(() => {
// A.1.5 顶级异步循环


/**
 * 一般来说，包括for-await-of循环在内的异步行为不能出现在异步函数外部。不过有时候可能确实需要在这样的上下文使用异步行为。
 * 为此可以通过创建异步 IIFE来达到目的
 */
class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncInx = 0;
    }
    async *[Symbol.asyncIterator]() {
        while(this.asyncInx < this.max) {
            yield new Promise(resolve => resolve(this.asyncInx++));
        }
    }
}

const emitter = new Emitter(5);

(async function() {
    const asyncCounter = emitter[Symbol.asyncIterator]();

    for await(const x of asyncCounter) {
        console.log('x-----', x);
    }

})();
// x----- 0
// x----- 1
// x----- 2
// x----- 3
// x----- 4
});

(() => {
// A.1.6 实现可观察对象

/**
 * 异步迭代器可以耐心等待下一次迭代而不会导致计算成本，那么这也为实现可观察对象(Observable)接口提供了可能。
 * 总体上看，这涉及捕获事件，将他们封装在期约中，然后把这些事件提供给迭代器，而处理程序可以利用这些异步迭代器。
 * 在某个事件触发时，异步迭代器的下一个期约会解决为该事件。
 * 
 * 注：可观察对象很大程度上是作为第三方库实现的。 可以了解下RxJs库
 */

// 下面的例子 会捕捉浏览器事件的可观察流。这需要一个期约的队列，每个期约对应一个事件。该队列也会保持事件生成的顺序，对这种问题来说保持顺序也是合理的。

})();