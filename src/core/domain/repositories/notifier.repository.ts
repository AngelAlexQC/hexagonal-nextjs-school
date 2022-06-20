import Enrollment from 'core/domain/models/enrollment';

export default interface NotifierRepository {
  notifyEnrollmentToUser(enrollment: Enrollment, email: string): Promise<void>;
  notifyEnrollmentToSchool(
    enrollment: Enrollment,
    email: string,
  ): Promise<void>;
}
