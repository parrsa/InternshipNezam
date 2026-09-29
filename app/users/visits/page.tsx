import React from 'react'
import VisitTable from './components/visitTable'
import { Button } from '@/app/components/ui/Button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'


function Visit() {

    return (
        <div className="w-full flex flex-col px-5 p-2 items-center justify-center">
                <div className="mb-5 w-full px-1 flex items-center justify-between">
                <h3 className="text-s font-normal text-neutral-600"> ۵ بازدید ثبت شده — ۲۰ ساعت </h3>
                <Button
                    variant="solid"
                    color="input"
                    rounded="lg"
                    leftIcon={<Plus size={19} />}
                    textSize="sm"
                    className={cn(
                        "h-8 "
                    )}
                >
                    <p>بازدید جدید</p>
                </Button>

            </div>
            <VisitTable />
        </div>
    )
}

export default Visit
