// src/auth/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail', // Change to your email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendVerificationEmail(to: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/verify?token=${token}`;
    return this.transporter.sendMail({
      to,
      subject: 'Verify your email',
      html: `<a href="${url}">Verify Email</a>`,
    });
  }

  // Additional methods for password reset, etc.
}
