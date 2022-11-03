import { RequestContext } from "next/dist/server/base-server"
import { useRouter } from "next/router"
import { useState } from "react"
import { client } from "../../api/apiClient"
import authMW from "../../nextJSMW/authMW"


export default function Create() {
    const [isError, setError] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    return <div className="w-[100vw] h-[100vh] flex  justify-center">
        <div className="flex justify-center items-center">
            <form className="flex flex-col w-[30%] bg-white p-5 h-[80vh] min-w-[416px] min-h-[400px] max-h-[500px]
        h-[100vh]
      rounded-[10%]
      "
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <div className="flex flex-col">
                    <label className="m-2 ">Title:</label>
                    <input type={'text'} className="bg-[#E7F0FE] flex-1 rounded-[5px]"
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>

                <div className="flex flex-col flex-1">
                    <label className="mr-2 ">Description:</label>
                    <textarea className="bg-[#E7F0FE] flex-1 rounded-[5px]"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button className="bg-[#0CA7C2] h-[30px] w-[100%] mt-5 text-white" onClick={async (e) => {
                    e.preventDefault()
                    try {
                        setError('')
                        await client({
                            method: 'POST',
                            path: '/postings',
                            headers: { credentials: 'include', 'Content-Type': 'application/json' },
                            body: JSON.stringify({ description, title })
                        })
                        router.back()
                    } catch (err: any) {
                        setError(err.message)
                    }

                }}>Submit</button>
                {isError &&
                    <span className="bg-red-300 mt-2">{isError}</span>
                }
            </form>

        </div>


    </div>


}


export async function getServerSideProps(context: RequestContext) {
    return authMW(context, true)
}