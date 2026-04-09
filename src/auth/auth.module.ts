import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';




@Module({
  imports: [
    UsersModule,   // Provides UsersService
    MailModule,    // Provides MailService
    ConfigModule,  // Provides ConfigService
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') as any },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], 
})
export class AuthModule {}