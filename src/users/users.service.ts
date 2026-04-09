import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';


@Injectable()
export class UsersService {
    constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: Partial<User>) {
    return this.userModel.create(data);
  }

  async findByEmail(email: string) {
  return this.userModel.findOne({
    email: { $regex: `^${email.trim()}$`, $options: 'i' },
  });
}
  
  

  async findById(id: string) {
    return this.userModel.findById(id);
  }
  
  async findByResetToken(token: string) {
  return this.userModel.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() },
  });
}

  async save(user: UserDocument) {
    return user.save();
  }

 async getProfile(user: any) {
  const foundUser = await this.userModel.findById(user.id).select('-password');
  return foundUser;
}

async findAll() {
  return this.userModel.find().select('-password');
}

async deleteUser(id: string) {
  const user = await this.userModel.findByIdAndDelete(id);

  if (!user) {
    throw new Error('User not found');
  }
  return {
    message: `User "${user.name}" has been deleted successfully `,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

async updateUser(id: string, data: any) {
  return this.userModel.findByIdAndUpdate(id, data, { new: true });
}

}
