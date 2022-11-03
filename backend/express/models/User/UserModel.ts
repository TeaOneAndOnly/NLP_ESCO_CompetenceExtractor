import BaseModel from "../BaseModel"
import hasher, { salt } from "../../services/Hasher";

export default class UserModel extends BaseModel {

    isAdmin = false
    firstName: string
    lastName: string
    isVerified: boolean
    password: string

    constructor(props: any) {
        super(props)
        this.isAdmin = props.isAdmin
        this.firstName = props.firstName
        this.lastName = props.lastName
        this.isVerified = props.isVerified
        console.log(props.password)

        this.password = hasher.hashSync(props.password, salt)

    }

}

