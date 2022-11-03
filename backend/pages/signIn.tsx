import { useRouter } from "next/router"
import { useState } from "react"
import { client } from "../api/apiClient"


export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setError] = useState('')


  return <div className="p-3 h-[100vh] w-[100vw] flex justify-center items-center">
    <form className="flex flex-col w-[30%] bg-white p-5 h-[80vh] min-w-[416px] min-h-[400px] max-h-[500px]
      rounded-tl-[10%]
      
    "
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <span className="text-2xl">Log in</span>
      <div className="Inputs p-3 h-[80%] flex justify-center flex-col">
        <span className="flex flex-col mb-5 justify-center items-center">
          <label className="flex justify-center mb-2">
            Username:
          </label>
          <input type={'text'} className='p-2  w-[80%] bg-[#E7F0FE]'
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </span>
        <span className="flex flex-col mt-5 justify-center items-center">
          <label className="flex justify-center mb-2">
            Password:
          </label>
          <input type={'password'} className='p-2  w-[80%] bg-[#E7F0FE]'
            onChange={(e) => setPassword(e.target.value)}></input>
        </span>
        <span className="flex flex-col mt-5 justify-center items-center">
          <button className="bg-[#0CA7C2] h-[30px] w-[80%] mt-5 text-white" onClick={async (e) => {
            e.preventDefault()
            try {
              setError('')
              await client({
                method: 'POST',
                path: '/signIn',
                headers: { credentials: 'include', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
              })
              router.push('/index')
            }catch (err: any) {
              console.log(err.message)

              setError(err.message)
            }

          }}>Log in</button>
        </span>

        {isError &&
          <span className="bg-red-300 mt-2">{isError}</span>
        }

      </div>

    </form>

  </div>
}
