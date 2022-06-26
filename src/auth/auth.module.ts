import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'

@Module({
  imports: [
    UserModule, 
    PassportModule,     
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}


// En el código anterior, hemos añadido UserModule, PassportModule y JwtModule en la matriz de importaciones.

// También utilizamos el método register() para proporcionar las opciones 
// necesarias: la clave secreta y el objeto signOptions, 
// que establecen la caducidad del token en 3600s, o 1 hora.

// Por último, hemos añadido LocalStrategy y JwtStrategy en la matriz de proveedores.