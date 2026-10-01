import React from 'react'
import MessageInbox from './components'

interface Props { }

function MessageParent(props: Props) {
    const { } = props

    return (
        <div className="w-full flex flex-col gap-4  px-5 p-2 items-center justify-center">
            <MessageInbox />

        </div>
    )
}

export default MessageParent


