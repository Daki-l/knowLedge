// 3.4.6 String类型

// 6、模版字面亮标签函数（tag function）
(() => {
    function simpleTag(strings, aValue, bValue, sunVal) {
        console.log('simpleTag', {strings, aValue, bValue, sunVal});
        return 'footer'
    }
    
    function simpleTag2(strings, ...expression) {
        console.log('simpleTag', {strings, expression});
        return 'footer'
    }
    
    function zipTzg(strings, ...expressiom) {
        return strings[0] + expressiom.map((e, index) => {
            return e + strings[index + 1];
        }).join('');
    }
    
    
    let a = 6;
    let b = 9;
    
    let unTaggedResult = `${a} + ${b} = ${ a + b }`;
    // let taggedResult = simpleTag`${a} + ${b} = ${ a + b }`;
    // let taggedResult = simpleTag2`${a} + ${b} = ${ a + b }`;
    let taggedResult = zipTzg`${a} + ${b} = ${ a + b }`;
    
    console.log('unaggedResult', unTaggedResult);
    console.log('taggedResult', taggedResult);
});

// 7、原始字符串 ( String.raw 标签函数)
(() => {
    console.log('模版字符串\u00A9', String.raw`\u00A9`);
    console.log('模版字符串\n', `first line\nsecond line`);
    console.log('模版字符串', String.raw`first line\nsecond line\u00A9`);
})();