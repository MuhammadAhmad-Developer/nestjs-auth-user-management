// users.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, UserDocument, UserRole } from './entity/user.entity';
//import { ForgotPasswordDto, ResetPasswordDto,RegisterDto, LoginDto,VerifyEmailDto, } from './dto/auth.dto';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  ResendVerificationDto,
} from './dto/auth.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

   
   /* async register(dto: RegisterDto) {
  const existing = await this.userModel.findOne({ email: dto.email });

  if (existing) {
    throw new ConflictException('Email already in use');
  }

  const hashed = await bcrypt.hash(dto.password, 10);

  const verificationToken = crypto.randomBytes(32).toString('hex');

  const verificationTokenExpiry = new Date(
    Date.now() + 24 * 60 * 60 * 1000,
  );

  await this.userModel.create({
    name: dto.name,
    email: dto.email,
    password: hashed,
    role: dto.role ?? UserRole.STUDENT,
    isVerified: false,
    verificationToken,
    verificationTokenExpiry,
  });

  return {
    message: 'Registration successful. Please check your email to verify your account',
  };
}    */

  async register(dto: RegisterDto) {
  const existing = await this.userModel.findOne({ email: dto.email });

  if (existing) {
    throw new ConflictException('Email already in use');
  }

  const hashed = await bcrypt.hash(dto.password, 10);

  const verificationToken = crypto.randomBytes(32).toString('hex');

  // Verification link will expire after 30 minutes
  const verificationTokenExpiry = new Date(
    Date.now() + 30 * 60 * 1000,
  );

  await this.userModel.create({
    name: dto.name,
    email: dto.email,
    password: hashed,
    role: dto.role ?? UserRole.STUDENT,
    isVerified: false,
    verificationToken,
    verificationTokenExpiry,
  });

  const verificationLink =
    `${process.env.BACKEND_URL}/user/verify-email/${verificationToken}`;

  await this.sendVerificationEmail(dto.email, verificationLink);

  return {
    message:
      'Registration successful. Please check your email to verify your account.',
  };
}

private async sendVerificationEmail(
  email: string,
  verificationLink: string,
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Virtual Chemistry Lab" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Verify Your Virtual Chemistry Lab Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Welcome to Virtual Chemistry Lab</h2>

        <p>
          Thank you for creating your account.
        </p>

        <p>
          Please click the button below to verify your email address:
        </p>

        <p>
          <a
            href="${verificationLink}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Verify Email
          </a>
        </p>

        <p>
          This verification link will expire in <strong>30 minutes</strong>.
        </p>

        <p>
          If you did not create this account, you can safely ignore this email.
        </p>

        <p>
          Regards,<br>
          Virtual Chemistry Lab Team
        </p>
      </div>
    `,
  });
}

async resendVerification(dto: ResendVerificationDto) {
  const user = await this.userModel.findOne({
    email: dto.email,
  });

  if (!user) {
    throw new BadRequestException(
      'No account found with this email',
    );
  }

  if (user.isVerified) {
    return {
      message: 'Email is already verified',
    };
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');

  // New link expires after 30 minutes
  const verificationTokenExpiry = new Date(
    Date.now() + 30 * 60 * 1000,
  );

  user.verificationToken = verificationToken;
  user.verificationTokenExpiry = verificationTokenExpiry;

  await user.save();

  const verificationLink =
    `${process.env.BACKEND_URL}/user/verify-email/${verificationToken}`;

  await this.sendVerificationEmail(
    user.email,
    verificationLink,
  );

  return {
    message: 'A new verification link has been sent to your email',
  };
}
  /*  async verifyEmail(dto: VerifyEmailDto) {
  const user = await this.userModel.findOne({
    verificationToken: dto.token,
    verificationTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw new BadRequestException(
      'Invalid or expired verification token',
    );
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  const token = this.signToken(user);

  return {
    message: 'Email verified successfully',
    data: { token },
  };
}     */

  async verifyEmail(dto: VerifyEmailDto) {
  const user = await this.userModel.findOne({
    verificationToken: dto.token,
    verificationTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw new BadRequestException(
      'Invalid or expired verification token',
    );
  }

  if (user.isVerified) {
    return {
      message: 'Email is already verified',
    };
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  const token = this.signToken(user);

  return {
    message: 'Email verified successfully',
    data: {
      token,
    },
  };
}

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');

    if (user.isVerified !== true) {
      throw new UnauthorizedException('Please verify your email before logging in');
    }

    user.lastLogin = new Date();
    await user.save();

    const token = this.signToken(user);

    return {
      message: 'Login successful',
      data: { token },
    };
  }

  logout() {
    return { message: 'Logged out successfully' };
  }

    async getMe(user: any) {
  const currentUser = await this.userModel.findById(user.userId).select('-password');

  if (!currentUser) {
    throw new BadRequestException('User not found');
  }

  return {
    data: {
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      isVerified: currentUser.isVerified,
      lastLogin: currentUser.lastLogin,
    },
  };
}


  async loginAsUser(id: string) {
  const user = await this.userModel.findById(id);

  if (!user) {
    throw new BadRequestException('User not found');
  }

  const token = this.signToken(user);

  return {
    message: 'Logged in as user successfully',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  };
}



  private signToken(user: UserDocument): string {
    return this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });
  }

  
  // GET ALL USERS
async getAllUsers() {
  return this.userModel.find().select('-password');
}

// GET SINGLE USER
async getUserById(id: string) {
  const user = await this.userModel.findById(id).select('-password');
  if (!user) throw new BadRequestException('User not found');
  return user;
}

// UPDATE USER
async updateUser(id: string, data: any) {
  const updated = await this.userModel.findByIdAndUpdate(id, data, {
    new: true,
  }).select('-password');

  if (!updated) throw new BadRequestException('User not found');
  return updated;
}

// DELETE USER
async deleteUser(id: string) {
  const deleted = await this.userModel.findByIdAndDelete(id);
  if (!deleted) throw new BadRequestException('User not found');

  return { message: 'User deleted successfully' };
}


async forgotPassword(dto: ForgotPasswordDto) {
  const user = await this.userModel.findOne({ email: dto.email });

  if (!user) {
    return {
      message: 'If this email exists, a password reset token has been generated.',
    };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 15 * 60 * 1000);

  user.resetPasswordToken = token;
  user.resetPasswordExpiry = expiry;

  await user.save();

  console.log('RESET TOKEN:', token);

  return {
    message: 'Reset token generated. Check server console for testing token.',
  };
}



async resetPassword(dto: ResetPasswordDto) {
  const user = await this.userModel.findOne({
    resetPasswordToken: dto.token,
    resetPasswordExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw new BadRequestException('Invalid or expired token');
  }

  user.password = await bcrypt.hash(dto.newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save();

  return {
    message: 'Password reset successful',
  };
}

}