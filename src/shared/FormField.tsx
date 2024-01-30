import { ErrorMessage, Field } from 'formik';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

interface inputFormProps{
    type : string;
    name : string;
    label: string;    
    placeHolder? : string;
    selectOptions? : [ key: string, value : string ][];
}

function defineInputType(type : string, name : string, placeHolder = '', options? : [ string, string][]){
    const [searchFocused, setsearchFocused] = useState(false)
    let field : JSX.Element;
    field = <div/>
    switch (type) {
        case "text":
            field = <Field className='input border-input' name={name} placeholder={placeHolder}/>
        break;
        case "number":
            field = <Field type="number" className='input  border-input' name={name} placeholder={placeHolder}/>
        break;
        case "date":
            field = <Field type='date' className='input border-input' name={name} placeholder={placeHolder}/>
        break;
        case "password":
            field = <Field type='password' className='input border-input' name={name} placeholder={placeHolder}/>
        break;
        case "file":
            field = <Field type="file" className='input border-input' name={name} placeHolder={placeHolder} />
        break;
        case "textarea":
            field = <Field as='textarea' className='input border-input' name={name} placeholder={placeHolder}/>
        break;
        case "select":
            field = <>
                        <Field as='select' list="country-list" className='select border-input' name={name} placeholder={placeHolder}>                           
                            {                                                           
                                options?.map(function(option){
                                    return (
                                        <option key={option[0]} value={option[0]}>
                                            {option[1]}
                                        </option>);
                                })
                            }
                        </Field>                            
                    </>
            
        break;
        case "search":
            field = <div className='flexbox-horizontal'>
                        <Field className='f-field f-field-search border-input' name={name} placeholder={placeHolder} onFocus={()=>setsearchFocused(true)} onBlur={()=>setsearchFocused(false)}/>
                        <button type='submit' className={`search-btn ${searchFocused ? 'search-btn-focus' : ''}`}>
                            <BsSearch/>
                        </button>
                    </div>
        break;  
        default:
            field = <></>
            break;
    }
    return field;
}
const FormField = (props : inputFormProps) => {
    return (
        <div className='flexbox-vertical'>
            {props.label? <label className='mt-2'>{props.label}</label> : <></>}            
            {defineInputType(props.type, props.name, props.placeHolder, props.selectOptions)}
            <ErrorMessage name={props.name} component="div" className='f-error' />
        </div>
        )
}

export default FormField
