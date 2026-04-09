
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import crypto from 'crypto'; // 1️⃣ import crypto

//  temporary in-memory map to store sid -> rawToken
const tempResetSessions = new Map<string, string>();

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  //  NEW function to send reset email with SID
  async sendResetEmailWithSID(to: string, rawToken: string) {
    try {
      //  generate one-time session ID
      const tempId = crypto.randomUUID();
      tempResetSessions.set(tempId, rawToken);

      //  auto-delete after 15 minutes
      setTimeout(() => tempResetSessions.delete(tempId), 15 * 60 * 1000);

      //  build email link with sid instead of raw token
      const resetLink = `${process.env.FRONTEND_URL}/reset-password.html?sid=${tempId}`;

      //  send email
      const result = await this.mailerService.sendMail({
        to,
        from: process.env.MAIL_FROM,
        subject: 'Password Reset',
        html: `<h3>Password Reset</h3>
               <p>Click the link below to reset your password:</p>
               <a href="${resetLink}">${resetLink}</a>`
      });

      console.log(' EMAIL SENT:', result);
      return result;

    } catch (error) {
      console.error(' SMTP Error:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }

  //  helper to access tempResetSessions from other files
  static getTempResetSessions() {
    return tempResetSessions;
  }
}




   
  











