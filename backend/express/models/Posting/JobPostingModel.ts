import BaseModel, { iBaseModel } from "../BaseModel";

interface IJobModel extends iBaseModel {
    title: string,
    description: string
}

export default class JobModel extends BaseModel implements IJobModel  {
    title: string;
    description: string;

    constructor(props: IJobModel) {
        super(props)
        this.title = props.title
        this.description = props.description
    }

}

