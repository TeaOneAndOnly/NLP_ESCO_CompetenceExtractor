const uuidv4 = require('uuid4')


export interface iBaseModel {
    _id?:string
}

class BaseModel {
    _id

    constructor(payload: iBaseModel) {
        this._id = payload._id || uuidv4()
    }

}

export default BaseModel;