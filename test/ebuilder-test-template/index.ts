import { WebComponent, html, render } from '../../src';
const StyleSheet = require('./ebuilder-test-template.less');

export default class EbuilderTestTemplate extends WebComponent {

    // 期望结果
    private expectResult;

    constructor() {
        super();

        // 初始样式表
        this.StyleSheet = StyleSheet;
        this.Style = StyleSheet.locals || {};

        // 渲染表单
        this.initConsole();

        this.state = {
            data : this.props['data']
        };
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

    render() {
        const { data } = this.state;
        this.className = this.Style.main;

        return html`
            <div>价格行情 ${ `2019/08/26` }</div>
            ${
                data.map(shelve=>{
                    return html`
                        <dl>
                            <dt>大类：${ shelve.shelveName }</dt>
                            ${
                                shelve.varieties.map(vars=>{
                                    return html`
                                        <div>
                                            <br/><div>种类：${vars.name}</div>
                                            ${
                                                vars.price.map(price=>{
                                                    return html`
                                                        <div>
                                                            <span>地区：${ price.region }</span>
                                                            <span>价格：${ price.money }</span>
                                                        </div>
                                                    `
                                                })
                                            }
                                        </div>
                                    `;
                                })
                            }
                        </dl>
                    `;  
                })
            }
        `;
    }

    /**
     * 生命周期-组件被安装后
     */
    componentDidMount(): void {
        const tag = this.tagName.toLocaleLowerCase();
        const expect = document.querySelector(`#${tag}-result .expect`);
        const area = document.querySelector(`#${tag}-result .result`);
        const judge = document.querySelector(`#${tag}-result .judge`);
        this.expectResult = `            <div>            <div>价格行情 2019/08/26</div>                                    <dl>                            <dt>大类：水果</dt>                                                                    <div>                                            <br><div>种类：香蕉</div>                                                                                                    <div>                                                            <span>地区：北京大洋路</span>                                                            <span>价格：5.7元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：北京新发地</span>                                                            <span>价格：5元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：岳各庄市场</span>                                                            <span>价格：5.7元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：北京八里桥</span>                                                            <span>价格：4.2元/公斤</span>                                                        </div>                                                                                            </div>                                                                            <div>                                            <br><div>种类：西瓜</div>                                                                                                    <div>                                                            <span>地区：北京大洋路</span>                                                            <span>价格：5.2元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：北京新发地</span>                                                            <span>价格：2.02元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：岳各庄市场</span>                                                            <span>价格：1.8元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：北京八里桥</span>                                                            <span>价格：2.1元/公斤</span>                                                        </div>                                                                                            </div>                                                            </dl>                                            <dl>                            <dt>大类：蔬菜</dt>                                                                    <div>                                            <br><div>种类：白菜</div>                                                                                                    <div>                                                            <span>地区：北京大洋路</span>                                                            <span>价格：0.5元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：北京新发地</span>                                                            <span>价格：0.8元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：岳各庄市场</span>                                                            <span>价格：1.5元/公斤</span>                                                        </div>                                                                                                            <div>                                                            <span>地区：北京八里桥</span>                                                            <span>价格：0.76元/公斤</span>                                                        </div>                                                                                            </div>                                                            </dl>                            </div>`;
        expect.innerHTML = this.expectResult;

        area.innerHTML = this.innerHTML;

        const ex = this.expectResult;
        const ts = this.innerHTML.replace(/\n/g,'');

        if( this.innerHTML.replace(/\n/g,'') ===  expect.innerHTML.replace(/\n/g,'') ){
            judge.className += ' yes';
            judge.innerHTML = '√'
        }else{
            judge.className += ' no';
            judge.innerHTML = '×'
        }
    }

}

customElements.define("ebuilder-test-template", EbuilderTestTemplate );