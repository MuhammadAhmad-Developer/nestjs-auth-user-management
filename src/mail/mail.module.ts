import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
       inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
    host: config.get('MAIL_HOST'), // smtp.gmail.com
    port: config.get('MAIL_PORT'), // 587
    
    secure: false,
    auth: {
       user: config.get<string>('MAIL_USER'),  // Your real email
      pass: config.get<string>('MAIL_PASS'),    // Your App Password 
          
       
    },
  },
        
    defaults: {
        from: config.get('MAIL_FROM'),
      },  
        
        
      }),
     
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

