import { enrollStudent } from './enrollment.interactor';
import SchoolMongo from 'core/infrastructure/database/mongo/school-mongo.datasource';
import UserMongo from 'core/infrastructure/database/mongo/user-mongo.datasource';
import EmailNotifier from 'core/infrastructure/notifications/email.notifier';

const userRepository = new UserMongo();
const schoolRepository = new SchoolMongo();
const notifierRepository = new EmailNotifier();

export default enrollStudent(
  userRepository,
  schoolRepository,
  notifierRepository,
);
