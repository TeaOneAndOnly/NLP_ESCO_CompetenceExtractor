import BaseDAO from "../BaseDAO";
import SkillModel from "./SkillModel";


class SkillDAO extends BaseDAO<SkillModel> {

}

export default new SkillDAO(SkillModel, 'Skill')