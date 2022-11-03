import { useRouter } from "next/router";
import { useState } from "react";
import UserModel from "../express/models/User/UserModel";
import store from "../zustand/store";


export default function Navigation({ user }: { user: UserModel }) {

    const router = useRouter()
    const [show, setShow] = useState(false)
    const { logout } = store(({ logout }) => ({ logout }))


    return <div className="bg-white w-[80%] h-[40px] box-border flex items-center justify-end p-2 mb-2 relative ">
        <div>Logged In as: [{user._id}]</div>
        <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer"
            onClick={() => setShow(!show)}

            height="40" viewBox="0 0 24 24" width="40"><path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>

        {
            show &&
            <div className="
            z-[60]
            p-1
            absolute z-50 bg-gray-300 top-[45px] rounded-[10%] border border-black border-solid flex cursor-pointer justify-end"
                onClick={async () => {

                    await logout()
                    router.reload()
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" width="40"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                />
                </svg>
            </div>
        }

    </div>
}