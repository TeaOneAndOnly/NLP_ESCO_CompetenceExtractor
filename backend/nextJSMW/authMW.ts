import { RequestContext } from "next/dist/server/base-server"
import { client } from "../api/apiClient"
import UserModel from "../express/models/User/UserModel"

export default async function authMW({ req, res }: RequestContext, requireAdmin = false) {

    try {
        const sessionCookie = req.cookies['session_cookie']
        const user = await client({
            path: `${process.env.DEPLOY_URL}/users/myself`,
            headers: {
                'Content-Type': 'application/json',
                cookie: `session_cookie=${sessionCookie}`
            },
        }) as UserModel

        // await new Promise((resolve,reject) => setTimeout(()=> resolve(true), 50000))
        if (requireAdmin && !user.isAdmin) {
            return {
                redirect: {
                    destination: '/prohibited',
                    permanent: false,
                },
            }
        }

        return {
            props: {
                user
            }
        }

    } catch (err) {
        console.log({ err })
        // await new Promise((resolve,reject) => setTimeout(()=> resolve(true), 50000))

        return {
            redirect: {
                destination: '/signIn',
                permanent: false,
            },
        }
    }
}
