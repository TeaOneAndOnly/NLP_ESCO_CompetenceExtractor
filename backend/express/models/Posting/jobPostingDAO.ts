import BaseDAO from "../BaseDAO";
import JobModel from "./JobPostingModel";


class JobDAO extends BaseDAO<JobModel> {

}

export default new JobDAO(JobModel, 'Job')