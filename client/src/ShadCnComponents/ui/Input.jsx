import { forwardRef, useId } from 'react';


const Input = forwardRef(function Input({
    type = "text",
    className='',
    ...props},ref
){
    const id = useId();
    return (
        <div className='w-full'>
        <input type={type}
        className={`${className} px-3 py-2  bg-[#3D3D3D] text-[#B0B0B0] outline-none focus:bg-gray-50 duration-200
        w-full`}
        ref={ref}
        {...props}
        id={id}
        />
        </div>
    )

})

export default Input