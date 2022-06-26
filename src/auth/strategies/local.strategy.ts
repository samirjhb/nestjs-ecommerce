import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

// En primer lugar, llama al método super() del constructor.
//  Podemos pasar un objeto options aquí si es necesario. 

// En segundo lugar, hemos añadido un método validate(),
//  que utiliza validateUser() del servicio de autenticación para verificar al usuario