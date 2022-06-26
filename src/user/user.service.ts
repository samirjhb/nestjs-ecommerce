import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { CreateUserDTO } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({username: username});
    return user;
  }
}

// El método addUser() crea un nuevo usuario, cifra la contraseña del nuevo usuario utilizando bcrypt.hash()
//  y, a continuación, guarda al usuario en la base de datos.

// El método findUser() encuentra un usuario en particular por el nombre de usuario.