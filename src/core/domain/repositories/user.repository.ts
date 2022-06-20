import Repository from './abstract.repository';
import User from 'core/domain/models/user';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface UserRepository extends Repository<User> {}
