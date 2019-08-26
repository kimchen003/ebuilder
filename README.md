# Ebuilder

用react思维去开发webcomponent

### 兼容性
提供一个polyfill文件，对低版本做兼容。    

浏览器 | 版本 | 支持
---- | ---- | ---- 
Safari | 5.1.7+ | √
Internet Explorer  | 11+ | √
Chrome  | 54+ | √


### Ebuilder 能做什么？
- 进入js组件库，编辑html标签即可完成一个页面
- 用生命周期钩子和状态器管理组件（但需要自己手动修改dom）
- 组件基类是DOM，可以直接被vue\react等其他框架调用

### 创建一个简单应用
```
git clone ...
yarn install
yarn start
```

### 使用手册
- [1. 生命周期](#user-content-生命周期)
- [2. 状态(State)机制](#user-content-状态机制)
- [3. 节点(Refs)缓存](#user-content-节点缓存)
- [4. 初始参数(Props)](#user-content-初始参数)
- [5. 兼容低版本浏览器(Polyfill)](#user-content-兼容低版本浏览器)

<h3 id="user-content-生命周期">1. 生命周期</h3>

- `componentWillMount`：组件被安装前，被调用。
``` js
// 例如可以在组件被安装前调数据接口
componentWillMount() {
    this.getData()
        .then(result => {
            this.setState({ data: result });
        });
}
```
- `render`：首次渲染时，被调用。
``` js
// 在渲染时定义组件初始结构
render() {
    return html`
        <div>Hello World !</div>
    `
}
```
- `componentDidMount`：组件被安装后，被调用。
``` js
// 例如可以在组件安装后绑定事件
update() {
    this.refs.btn.onclick = function(){
        ...
    }
}
```
- `update`: 组件更新时，被调用。
``` js
// 例如可以在被点击是显示组件
update() {
    this.setState({ show: true });
}
```
- `componentDidUnmount`: 组件被移除后，被调用。
``` js
// 例如可以在组件被移除后清除计时器
componentDidUnmount() {
    clearInterval(timer);
}
```

<h3 id="user-content-状态机制">2. 状态(State)机制</h3>

`setState`是组件统一的API，用于主动触发组件的样式或结构变化。       
注：开发者需要手动控制`state`改变后的变化。
``` js
import { WebComponent, html, render } from 'ebuilder';

export default class EbuilderTest extends WebComponent {

    constructor() {
        super();

        this.state = {
            show : false
        };

    }

    render() {
        return html`
            <div>Hello World !</div>
        `;
    }

    update(change): void {
        if( change.show ){
            this.style.display = "block"
        }
    }


}

customElements.define("ebuilder-test", EbuilderTest );

```

<h3 id="user-content-节点缓存">4. 节点(Refs)缓存</h3>

ebuider会根据节点上的`ref`标记缓存节点          
注：同一个标记只缓存一个节点
``` js
import { WebComponent, html, render } from 'ebuilder';

export default class EbuilderTest extends WebComponent {

    render() {
        const { Style } = this;
        this.className = Style.main;

        return html`
            <div ref='title'>Hello World !</div>
        `;
    }

    componentDidMount() {
        setTimeout(()=>{
            this.refs.title.innerHTML = 'Changed !';
        },300)
    }

}

customElements.define("ebuilder-test", EbuilderTest );
```

<h3 id="user-content-初始参数">4. 初始参数(Props)</h3>

每次调用`props`，ebuilder会遍历组件标签上的`attribute`，然后返回一个json对象。同时把对每个属性值尝试进行`JSON.parse()`，并将属性名`aa-bb`转成`aaBb`格式。
``` html
<ebuilder-test goods-list="[{name:'香蕉'},{a:'苹果'}]"></ebuilder-test>
```
``` js
import { WebComponent, html, render } from 'ebuilder';

export default class EbuilderTest extends WebComponent {

    constructor() {
        super();

        this.state = {
            data : this.props['goodsList']
        };

    }

    render() {
        return html`
            ${
                data.map(c => {
                    return html`
                        <div>产品：${ c.a }</div>
                    `;
                })
            }
        `;
    }
}

customElements.define("ebuilder-test", EbuilderTest );
```

<h3 id="user-content-兼容低版本浏览器">5. 兼容低版本浏览器(Polyfill)</h3>

建议采用动态加载，压缩后的js文件在目录`./polyfill/dist`。

``` html
<script>
    if( !window.customElements ){
        document.write('<script src="https://raw.githubusercontent.com/kimchen003/ebuilder/master/polyfill/dist/index.js"><\/script>');
    }
</script>
```

