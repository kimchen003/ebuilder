import { WebComponent, html, render } from '../../src';
const StyleSheet = require('./ebuilder-test-list.less');

export default class EbuilderTestList extends WebComponent {

    private timer;
    
    // 期望结果
    private expectResult;

    /**
     * 导航组件
     */
    constructor() {
        super();

        // 初始样式表
        this.StyleSheet = StyleSheet;
        this.Style = StyleSheet.locals || {};
        
        // 初始化状态
        this.state = {
            list : []
        };

        // 渲染表单
        this.initConsole();
    }

    /**
     * 渲染表单
     */
    initConsole() {
        const tag = this.tagName.toLocaleLowerCase();
        const area = document.getElementById(`${tag}-result`);
        area.nextElementSibling.nextElementSibling.innerHTML = `<code class="js"> ${ area.nextElementSibling.outerHTML.replace(/\</g,'&lt;').replace(/\>/g,'&gt;') } </code>`;
        const dom = html`
            <table id="${tag}-result-table" class="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">运行结果</th>
                        <th scope="col">期望</th>
                        <th scope="col">结果</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="result" scope="col"></td>
                        <td class="expect" scope="col"></td>
                        <td class="judge" scope="col"></td>
                    </tr>
                </tbody>
            </table>
        `;
        render(dom, area);
    }

    /**
     * 生命周期-首次渲染时
     */
    render() {
        const { Style } = this;
        this.className = Style.main;

        return html`
            <div class="${ Style.list }" ref='list'></div>
        `;
    }

    /**
     * 生命周期-组件被安装后
     */
    componentDidMount(): void {

        // 渲染列表
        this.renderList();

        const tag = this.tagName.toLocaleLowerCase();
        const expect = document.querySelector(`#${tag}-result .expect`);
        this.expectResult = `<div>
            <div class="ebuilder-test-list__list" ref="list"><div class="ebuilder-test-list__row">列表1</div><div class="ebuilder-test-list__row">列表2</div><div class="ebuilder-test-list__row">列表3</div><div class="ebuilder-test-list__row">列表4</div></div>
        </div>`;
        expect.innerHTML = this.expectResult;

        setTimeout(()=>{
            this.setState({
                list : [1,2,3,4]
            });

            const area = document.querySelector(`#${tag}-result .result`);
            const expect = document.querySelector(`#${tag}-result .expect`);
            const judge = document.querySelector(`#${tag}-result .judge`);

            area.innerHTML = this.innerHTML;

            if( this.innerHTML === this.expectResult ){
                judge.className += ' yes';
                judge.innerHTML = '√'
            }else{
                judge.className += ' no';
                judge.innerHTML = '×'
            }
            
        },300);
    }

    /**
     * 生命周期-组件更新时
     * @param   change    状态变化
     */
    update(change): void {
        const keys = Object.keys( change );
        keys.map(k=>{
            switch(k){
                case 'list': this.renderList(); break;
            }
        });
    }

    /**
     * 渲染列表
     */
    renderList(): void {
        const listWrap = this.refs.list;
        const { list } = this.state;
        const { Style } = this;
        let data;
        try{ data = typeof list === 'string' ? JSON.parse(list) : list; }catch(err){}
        if( !data || data.length === undefined )return;

        render( 
            html`${
                data.map(c => {
                    return html`<div class='${ Style.row }'>列表${ c }</div>`;
                })
            }`
        , listWrap );
        
    }

}

customElements.define("ebuilder-test-list", EbuilderTestList );