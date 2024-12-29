import React from "react";

function Button({children,type="text",bgColor="bg-blue-600",textColor="text-white",classNames="",...props}){

    return (
        <button  className={`px-4 py-2 rounded-lg hover:bg-blue-700 ${bgColor} ${textColor} ${classNames}`} {...props}>
            {children}
        </button>
    )

}

export default Button