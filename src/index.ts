import { html, render } from './library/little-html';

/*
 *  组件抽象类
 */
abstract class WebComponent extends HTMLElement {

    // 样式名集合
    public Style;

    // 标记节点列表
    public refs;

    // 样式表
    public StyleSheet;

    // 参数
    set props(value) {
        console.warn('注意：props 不可修改');
    }

    get props() {
        const attr = {};
        var len = this.attributes.length;
        for(var i=0;i<len;i++){
            let it = this.attributes[i];
            let localName = it.localName.replace(/-(\w)/g,function($0,$1){
                return $1.toUpperCase();
            });
            try{
                attr[localName] = JSON.parse(it.value.replace(/\n|\s/g,'') ); 
            }catch(err){
                console.log(err);
                attr[localName] = it.value;
            }
            
        }
        return attr;
    }

    // 状态
    public state;

    /**
     * 生命周期-组件被安装前
     */
    public componentWillMount(): void {}

    /**
     * 生命周期-渲染时
     */
    public render(): any {
        return `${this.innerHTML}`;
    }

    /**
     * 生命周期-组件被安装后
     */
    public componentDidMount(): void {}

    /**
     * 生命周期-组件更新时
     * @param   change    状态变化
     */
    public update(change): void {}
    
    /**
     * 生命周期-组件被移除后
     */
    public componentDidUnmount(): void {}

    /**
     * 设置状态
     * @param   state     参数
     */
    setState(state): void{
        const change = {};
        for(let x in this.state){
            const st = this.state[x];
            const nextSt = state[x];
            if( 
                Object.keys(state).indexOf(x) !== -1 && 
                (
                    typeof st !== typeof nextSt || 
                    JSON.stringify(st) !== JSON.stringify(nextSt)
                )
            ){
                change[x] = nextSt;
                this.state[x] = nextSt;
            }
        }

        // 生命周期-组件更新
        this.update(change);

    }

    /**
     * 首次被插入文档DOM时
     */
    connectedCallback(): void{

        // 初始化属性
        !this.refs && ( this.refs={} );
        !this.state && ( this.state={} );

        // 生命周期-组件被安装前
        this.componentWillMount();

        // 注入css
        this.injectCss();

        // 渲染节点
        const dom = this.render();
        const nextDom = document.createElement('div');
        if( dom && Object.keys(dom).toString() == 'strings,options' ){
            render(dom, nextDom);
            const tag = nextDom.querySelector('[ref=childrens]');
            tag && [...this.children].map( c => tag.appendChild(c) );
        }else{
            console.error(
                'Error：render() 返回对象请用 html`..` 模板生成\n'+
                `请检查组件 ${this.tagName.toLocaleLowerCase()} 的render()方法`
            );
        }

        // 渲染全部子节点
        this.appendChild( nextDom );

        // 刷新refs标记节点列表
        this.upDateRefs();

        // 生命周期-组件被安装后
        this.componentDidMount();

    }

    /**
     * 被移除之后
     */
    disconnectedCallback(): void {
        this.componentDidUnmount();
    }

    /**
     * 注入css
     */
    injectCss(): void {
        const id = (this.tagName + '-stylesheet').toLocaleLowerCase();
        if( this.StyleSheet && !document.getElementById(id) ){
            const styleSheet = document.createElement('style');
            styleSheet.id = id;
            styleSheet.innerText = this.StyleSheet[0][1];

            document.head.insertBefore(styleSheet, document.querySelector('title') );
        }
    }

    /**
     * 刷新refs标记节点列表 
     */
    upDateRefs(): void {
        const getChild = (parent: Element) =>{
            const attr = parent.getAttribute('ref');
            if( parent.children.length>0 && attr!=='childrens' ){
                [...parent.children].map( c => getChild(c) );
            }
            if( attr ){
                this.refs[attr] = parent;
            }
        }
        getChild(this);
    }

}

export { WebComponent, html, render }