import React, { forwardRef, useId } from 'react'
import { useSelector } from 'react-redux'
const Input=forwardRef(({label,classNames="",type="text",...props},ref)=>{
    const id=useId()
    const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)
    return(
    <div className='w-full'>
        {
            label?(
                <div>
                    <label htmlFor={id} className={`inline-block text-sm font-medium ${isDarkMode?"text-darkSecondaryTextColor":"text-gray-600"} mb-3 pl-1`}>
                        {label}
                    </label>
                </div>
            ):null
        }
        <input type={type} 
        className={`w-full px-3 outline-none py-2 focus:ring-2 ${isDarkMode?"focus:ring-white":"focus:ring-blue-500"} focus:outline-none rounded-lg  duration-200 ${isDarkMode?"bg-darkButtonsTextColor text-darkPrimaryTextColor":"border border-gray-300 bg-gray-50 text-black"} w-full ${classNames}`}
        id={id} ref={ref} {...props}/>
    </div>
    )
})

export default Input