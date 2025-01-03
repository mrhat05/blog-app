import React  from 'react'
import { forwardRef, useId } from "react"
import { useSelector } from 'react-redux'

const Select=forwardRef(({label,options,classNames,...props},ref)=>{
    const id =useId()
    const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)
    return (<div className="w-full">
        {
            label?(
                <div>
                    <label htmlFor={id} className={`inline-block mb-3 pl-1text-sm font-medium ${isDarkMode?"text-darkSecondaryTextColor":"text-gray-600"}`}>
                        {label}
                    </label>
                </div>
            ):null
        }

        <select {...props} ref={ref} 
        className={`px-3 py-2 rounded-lg outline-none duration-200 w-full ${isDarkMode?"bg-darkButtonsTextColor text-darkPrimaryTextColor":"border border-gray-300 bg-gray-50 text-black"} ${classNames}`}
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