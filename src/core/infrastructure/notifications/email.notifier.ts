import enrollment from 'core/domain/models/enrollment';
import NotifierRepository from 'core/domain/repositories/notifier.repository';
import { SentMessageInfo, Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class EmailNotifier implements NotifierRepository {
  mailer: Transporter<SentMessageInfo>;
  constructor() {
    const options: SMTPTransport.Options = {
      host: process.env.MAIL_HOST as string,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USERNAME as string,
        pass: process.env.MAIL_PASSWORD as string,
      },
      secure: true,
      from: `${process.env.MAIL_FROM} <${process.env.MAIL_FROM_EMAIL}>`,
    };
    this.mailer = createTransport(options);
  }

  sendEmail(email: string, subject: string, body: string): Promise<void> {
    return this.mailer.sendMail({
      to: email,
      subject,
      html: body,
    });
  }

  notifyEnrollmentToUser(enrollment: enrollment, email: string): Promise<void> {
    const subject = 'Enrollment Confirmation';
    const body = `
      <h1>Enrollment Confirmation</h1>
      <p>
        You have successfully enrolled in ${enrollment.schoolName}
      </p>
      <p>
        <a href="https://google.com">
          Go to ${enrollment.schoolName}
        </a>
      </p>
    `;
    return this.sendEmail(email, subject, body);
  }

  notifyEnrollmentToSchool(
    enrollment: enrollment,
    email: string,
  ): Promise<void> {
    const subject = 'Enrollment Confirmation';
    const body = `
      <h1>Enrollment Confirmation</h1>
      <p>
        The user ${enrollment.userName} has successfully enrolled in ${enrollment.schoolName}
      </p>
      <p>
        <a href="https://google.com">
          Go to ${enrollment.schoolName}
        </a>
      </p>
    `;
    return this.sendEmail(email, subject, body);
  }
}
