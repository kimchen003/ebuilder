import { WebComponent, html, render } from '../../src';

export default class EbuilderTestLifeCircle extends WebComponent {

    // 期望结果
    private expectResult;

    // 打印计数
    private count;

    constructor() {
        super();

        this.state = {
            a : 1
        }

        // 打印计数
        this.count = 0;

        // 期望结果
        this.expectResult = [
            '> 触发 componentWillMount() 组件被安装前',
            '> 触发 render() 首次渲染时',
            '> 触发 componentDidMount() 组件被安装后',
            '> 触发 update() 组件更新时',
            '> 触发 componentDidUnmount() 组件被移除后'
        ];

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
                    ${
                        this.expectResult.map((c, i)=>{
                            return html`
                                <tr id="${tag}-result-${i}">
                                    <td class="result" scope="col">--</td>
                                    <td class="expect" scope="col">${ c }</td>
                                    <td class="judge" scope="col"></td>
                                </tr>
                            `;    
                        })
                    }
                </tbody>
            </table>
        `;
        render(dom, area);
    }


    /**
     * 打印
     */
    private consolelog(...info){
        
        const tag = this.tagName.toLocaleLowerCase();
        const table = document.querySelector(`#${tag}-result-table tbody`);
        const target = document.querySelector(`#${tag}-result-${this.count} td.result`);
        const expect = document.querySelector(`#${tag}-result-${this.count} td.expect`);
        const judge = document.querySelector(`#${tag}-result-${this.count} td.judge`);
        const context = `> ${info.join(' ')}`;

        if( target ){
            target.innerHTML = context;
            if( this.expectResult[this.count] === context ){
                judge.className += ' yes';
                judge.innerHTML = '√'
            }else{
                judge.className += ' no';
                judge.innerHTML = '×'
            }
        }else{
            const dom = html`
                <td class="result" scope="col">${ context }</td>
                <td class="expect" scope="col">无</td>
                <td class="judge no" scope="col">×</td>
            `;
            const tr = document.createElement('tr');
            tr.id = `${tag}-result-${this.count}`;
            render(dom, tr);
            table.appendChild( tr );
        }
        this.count ++;
    }

    /**
     * 生命周期-组件被安装前
     */
    componentWillMount(): void {
        this.consolelog( '触发', 'componentWillMount()', '组件被安装前' );
    }

    /**
     * 生命周期-组件被移除后
     */
    componentDidUnmount(): void {
        this.consolelog( '触发', 'componentDidUnmount()', '组件被移除后' );
    }
     
    /**
     * 生命周期-首次渲染时
     */
    render() {
        this.consolelog( '触发', 'render()', '首次渲染时' );

        return html``;
    }

    /**
     * 生命周期-组件被安装后
     */
    componentDidMount(): void {
        this.consolelog( '触发', 'componentDidMount()', '组件被安装后' );

        this.setState({a:1});
        this.parentNode.removeChild(this);
    }

    /**
     * 生命周期-组件更新时
     * @param   change    状态变化
     */
    update(change): void {
        this.consolelog( '触发', 'update()', '组件更新时' );
    }

}

customElements.define("ebuilder-test-life-circle", EbuilderTestLifeCircle );
