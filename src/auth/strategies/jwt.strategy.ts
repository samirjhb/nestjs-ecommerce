import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}

//En el código anterior, establecemos un objeto options con las siguientes propiedades:

// jwtFromRequest indica al módulo Passport cómo se extraerá JWT de la solicitud (en este caso, como token portador)

// ignoreExpiration establecido en false significa que la responsabilidad de garantizar que un JWT no haya caducado se delega en el módulo Passport

// secretOrKey se utiliza para firmar el token

// El método validate() devuelve una carga útil, que es el JWT decodificado como JSON.
//  A continuación, utilizamos esta carga útil para devolver un objeto de usuario con las propiedades necesarias