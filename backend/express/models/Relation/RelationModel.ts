import BaseModel, { iBaseModel } from "../BaseModel";

interface IRelationModel extends iBaseModel {
    fromType: string,
    toType: string,
    fromId: string,
    toId: string

}

export default class RelationModel extends BaseModel implements IRelationModel {
    fromType: string;
    toType: string;
    fromId: string;
    toId: string;

    constructor(props: IRelationModel) {
        super(props)
        this.fromType = props.fromType
        this.toType = props.toType
        this.fromId = props.fromId
        this.toId = props.toId
    }


}

