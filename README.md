<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Descripcion

Crear un nuevo proyecto Nest para nuestra aplicación de comercio electrónico


-Creación de métodos de controlador de producto

Ruta de Url de la api

* POST store/products/ — Agregar nuevo producto
* GET store/products/ — Buscar todo los  productos
* GET store/products/:id — Buscar producto por id
* PUT store/products/:id — Editar prodoucto por id
* DELETE store/products/:id — Eliminar producto por id


-Creacion de metodos de controlador de autenticacion y usuario

Ruta de Url de la api

* POST auth/register --> Se utiliza para crear un nuevo usuario
* POST auth/login --> Se utiliza para iniciar sesión en un usuario registrado
* GET auth/user --> Se utiliza para acceder al perfil del usuario
* GET auth/admin --> Se utiliza para acceder al perfil del admininistrador

## Instalacion

```bash
$ npm install
```

## Ejecutando la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Packages del proyecto 

* npm install --save @nestjs/mongoose mongoose ---> MongoDB
* npm install bcrypt ---> bcrypt
* npm install -D @types/bcrypt ---> @types/bcrypt
* npm install --save @nestjs/passport passport passport-local ---> Libreria  passport
* npm install --save-dev @types/passport-local ---> Libreria  passport
* npm install dotenv ---> Dotenv
* npm install --save @nestjs/jwt passport-jwt ---> Estrategia de autenticación utilizando JSON Web Tokens (JWT).
* npm install --save-dev @types/passport-jwt ---> Estrategia de autenticación utilizando JSON Web Tokens (JWT).


## Mantente en contacto

- Author - [Samir Hadechni]


 


