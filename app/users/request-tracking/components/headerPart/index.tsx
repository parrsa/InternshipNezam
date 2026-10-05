import React from 'react'

const Percent = [
    {
        id: 1,
        percent: "55%"
    }
]

function HeaderPart() {

    return (
        <div className=' w-full flex  flex-col gap-3'>
            <div className=" w-full flex justify-between">
                <div className="w-1/2  flex flex-col gap-1">
                    <h1 className=' text-s font-semibold'>
                        فرایند تأیید درخواست کارآموزی
                    </h1>
                    <p className=' text-neutral-500 text-xs '>
                        کد درخواست: REQ-۱۴۰۴-۹۴۵۲ — تاریخ ثبت: ۱۴۰۴/۰۴/۰۱
                    </p>
                </div>
                <div className=" w-1/2 flex justify-end ">
                    <span
                        className="text-3xs w-18 h-6 rounded-full flex items-center justify-center  bg-input-100 border-indigo-200 border text-input-800">
                        ۵ از ۹ مرحله
                    </span>
                </div>
            </div>
            <div className=" w-full">
                
                {Percent.map((item: any, index) => (
                    <div
                        key={index}
                        >
   
                        <div className=" h-2 flex items-end rounded-full justify-end  bg-indigo-100 w-full">

                            <div style={{ width: `${item.percent}` }} className=" h-2 bg-input-800  rounded-full"></div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default HeaderPart
