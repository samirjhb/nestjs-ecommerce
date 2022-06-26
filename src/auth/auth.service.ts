import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'; // 1
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {} // 2

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

//El código nos da un método de validación del usuario,
// que recupera al usuario y verifica su contraseña.


// El código anterior está etiquetado para que puedas seguir lo que hicimos:

// Importó el JwtService (véase //1)

// Se ha añadido JwtService al constructor (véase //2).

// Luego utilizamos el método login() para firmar un JWT.