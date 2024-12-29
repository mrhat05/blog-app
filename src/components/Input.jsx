import React, { forwardRef, useId } from 'react'

const Input=forwardRef(({label,classNames="",type="text",...props},ref)=>{
    const id=useId()
    return(
    <div className='w-full'>
        {
            label?(
                <div>
                    <label htmlFor={id} className='inline-block text-sm font-medium text-gray-600 mb-3 pl-1'>
                        {label}
                    </label>
                </div>
            ):null
        }
        <input type={type} 
        className={`px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg bg-white text-black focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classNames}`}
        id={id} ref={ref} {...props}/>
    </div>
    )
})

export default Input