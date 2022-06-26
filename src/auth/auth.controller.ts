import { Controller, Request, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }
}


//Tenemos cuatro puntos finales en el código anterior:

//La autorización/registro POST se utiliza para crear un nuevo usuario

//La autorización/inicio de sesión POST se utiliza para iniciar sesión en un usuario registrado
// *Para verificar al usuario, utilizamos LocalAuthGuard

//GET auth/user se utiliza para acceder al perfil del usuario
// *Utilizamos JwtGuard para autenticar al usuario
// *Utilizamos el decorador RolesGuard más @Roles para proporcionar la autorización adecuada en función de los roles del usuario

//GET auth/admin se utiliza para acceder al panel de administración
// *También utilizamos JwtGuard y RolesGuard como se hizo en el punto final anterior