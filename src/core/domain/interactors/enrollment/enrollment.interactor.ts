import Enrollment, { EnrollmentStatus } from 'core/domain/models/enrollment';
import School from 'core/domain/models/school';
import User from 'core/domain/models/user';
import NotifierRepository from 'core/domain/repositories/notifier.repository';
import SchoolRepository from 'core/domain/repositories/school.repository';
import UserRepository from 'core/domain/repositories/user.repository';

export const enrollStudent =
  (
    userRepository: UserRepository,
    schoolRepository: SchoolRepository,
    notifierRepository: NotifierRepository,
  ) =>
  async (
    userId: string,
    schoolId: string,
    level: number,
  ): Promise<Enrollment> => {
    // get user by userId
    const user: User = await userRepository.getById(userId);
    // get school by schoolId
    const school: School = await schoolRepository.getById(schoolId);
    // create enrollment
    const enrollment: Enrollment = {
      userId: userId,
      schoolId: schoolId,
      level: level,
      schoolName: school.name,
      userName: user.firstName + ' ' + user.lastName,
      status: EnrollmentStatus.ACTIVE,
    };
    // notify user
    await notifierRepository.notifyEnrollmentToUser(enrollment, user.email);
    // notify school
    await notifierRepository.notifyEnrollmentToSchool(enrollment, school.email);
    // return enrollment
    return enrollment;
  };
