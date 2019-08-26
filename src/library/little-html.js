/**
 * 标签模板
 * @param   strings         变量
 * @param   options      参数
 */
export const html = (strings,...options)=>{
    return { strings, options };
};

/**
 * 渲染
 * @param   template    标签模板对象
 * @param   parent      父节点
 */
export const render = (template, parent)=>{
    let context = '';

    const collector = tmp =>{  
        if( tmp instanceof Array ){
            tmp.map(op=>{
                collector( op );
            });
            return;
        }

        if( !tmp.strings ){
            context += tmp;
            return;
        }

        tmp.strings.map((str, i)=>{
            context += str;
            const option = tmp.options[i];
            
            if( option !== undefined ){
                if( typeof option !== 'object' ){  
                    context += option;
                }else{
                    if( option instanceof Array ){
                        option.map(op=>{
                            collector( op );
                        });
                    }else{
                        collector( option );
                    }
                    
                }
            }
        });
    }

    collector(template);
    
    parent.innerHTML = context;
};


