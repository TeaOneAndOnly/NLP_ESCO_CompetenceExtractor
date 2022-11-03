import BaseDAO from "../BaseDAO";
import MemoryAdapter from "../MemoryAdapter";
import SessionModel from "./SessionModel";

class SessionDAO extends BaseDAO<SessionModel> {}

export default new SessionDAO(SessionModel, 'Session', MemoryAdapter)