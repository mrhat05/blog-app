import React  from 'react'
import { forwardRef, useId } from "react"

const Select=forwardRef(({label,options,classNames,...props},ref)=>{
    const id =useId()
    return (<div className="w-full">
        {
            label?(
                <div>
                    <label htmlFor={id} className='inline-block mb-3 pl-1text-sm font-medium text-gray-600'>
                        {label}
                    </label>
                </div>
            ):null
        }

        <select {...props} ref={ref} 
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classNames}`}
        id={id}>
            {
                options.map((opt)=>(
                    <option key={opt} value={opt}>{opt}</option>
                ))
            }
        </select>

    </div>)
})

export default Select