import BaseModel, { iBaseModel } from "../BaseModel";

interface iSessionModel extends iBaseModel  {
    expiresAt: Date
    userId: string
}


class SessionModel extends BaseModel {

    expiresAt: Date
    userId: string


    constructor(props: iSessionModel) {
        super(props)
        this.userId = props.userId
        this.expiresAt = props.expiresAt
    }
}

export default SessionModel