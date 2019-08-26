import './ebuilder-test-list';
import './ebuilder-test-life-circle';
import './ebuilder-test-template';

//if( !window.customElements ){
    const script = document.createElement('script');
    script.src = 'http://10.228.11.11/dakun/ebuilder/raw/master/polyfill/dist/index.js';

    document.body.appendChild( script );
    console.log(script)
    //document.write('<script src="http://10.228.11.11/dakun/ebuilder/raw/master/polyfill/dist/index.js"><\/script>');
//}

// 注入页面css
const styleSheet = document.createElement('style');
styleSheet.innerText = require('./less/index.less')[0][1];
document.body.appendChild(styleSheet);

// 代码样式渲染
document.addEventListener('DOMContentLoaded', (event) => {
    [...document.querySelectorAll('pre code')].map((block) => {
        window['hljs'].highlightBlock(block);
        block['style'].visibility = 'visible';
    });
});