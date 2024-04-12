import React from 'react';
interface InputProps{
    placeholder?:string
    type?:string
    value?:string
    id?:string
}

const Input:React.FC<InputProps>=(props)=>{
    return(
        <input className={` text-white px-4 rounded-3xl bg-neutral-800 w-64 h-12 `} {...props}>

        </input>
    )
}

export default Input