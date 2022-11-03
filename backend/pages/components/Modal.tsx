import { Component } from "react";
import store from "../../zustand/store";


export default function Modal() {

    const { modalProps, setModalProps } = store(({ modalProps, setModalProps }) => ({ modalProps, setModalProps }))
    const { title, component, show, disableFooter, callBack } = modalProps

    return (
        <>
            {
                show
                &&
                <div
                    className="h-[100%] w-[100%] absolute bg-black z-20 justify-center flex items-center bg-opacity-[50%] rounded-[10%] text-center "
                >
                    <div className="w-[33%] bg-white opacity-100 min-w-[330px] max-h-[416px] flex flex-col p-4 rounded-[5%]">
                        <div className="text-4xl mb-2">
                            {title}
                        </div>
                        <div>
                            {component}
                        </div>
                        {!disableFooter &&
                            <div className="flex justify-center">
                                <button className="text-xl mr-2" onClick={() => {
                                    callBack()
                                    setModalProps({ ...modalProps, show: false })
                                }}>
                                    Yes
                                </button>
                                <button className="text-xl" onClick={() => setModalProps({ ...modalProps, show: false })}>
                                    No
                                </button>
                            </div>
                        }

                    </div>
                </div>
            }



        </>

    )
}