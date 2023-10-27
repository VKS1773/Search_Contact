import React from 'react'
import { AiOutlineClose } from 'react-icons/Ai';
import { createPortal } from "react-dom"

function Model({ isOpen, onClose, children }) {
    return createPortal(
        <>
            {isOpen && (
                <>
                    <div className="absolute top-0 z-40 grid  h-screen w-screen place-items-center backdrop-blur">
                        <div className=" z-50 relative grid-cols-{2} bg-white rounded-lg p-4 ">
                            <div className="flex justify-end ">
                                <AiOutlineClose onClick={onClose} className="text-2xl cursor-pointer" />
                            </div>
                            {children}
                        </div>
                        <div onClick={onClose} className=" top-0 z-40 h-screen w-screen backdrop-blur absolute " />
                    </div>
                </>
            )
            }
        </>,
        document.getElementById("model-root")
    )
}

export default Model