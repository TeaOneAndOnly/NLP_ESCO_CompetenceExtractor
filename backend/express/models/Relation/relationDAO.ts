import BaseDAO from "../BaseDAO";
import RelationModel from "./RelationModel";


class RelationDAO extends BaseDAO<RelationModel>{ }

export default new RelationDAO(RelationModel, 'Relation')