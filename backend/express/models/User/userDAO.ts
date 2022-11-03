import BaseDAO from '../BaseDAO'
import UserModel from './UserModel'


class UserDAO extends BaseDAO<UserModel> {

}

export default new UserDAO(UserModel, 'User')