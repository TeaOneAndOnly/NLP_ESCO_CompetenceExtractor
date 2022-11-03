import BaseModel, {iBaseModel} from "../BaseModel";

interface ISkillModel extends iBaseModel  {
    label: string
}

export default class SkillModel extends BaseModel implements ISkillModel {

    label: string
    constructor(props: ISkillModel) {
        super(props)
        this.label = props.label
    }

}

