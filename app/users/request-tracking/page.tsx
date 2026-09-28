import React from 'react'
import HeaderPart from './components/headerPart'
import StepsPart from './components/stepsPart'
import CurrentActionPart from './components/currentActionPart'


function RequstTracking() {

    return (
        <div>


            <div className="w-[97%] flex flex-col gap-2 mt-2  px-5 p-2 pt-7  rounded-2xl border-2  shadow-xs border-neutral-200  bg-white  mx-auto">
                <HeaderPart />
                <StepsPart />
            </div>

            <div className="w-full  px-5 p-2 rounded-2xl mx-auto">
            <CurrentActionPart />
            </div>

        </div>
    )
}

export default RequstTracking
