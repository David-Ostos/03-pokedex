<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

### 1. Clonar el repositorio

### 2. Ejecutar
```
npm i
```

### 3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

### 4. Levantar la base de datos
```
docker compose up -d
```
### 5. Reconstruir la base de datos con semillas

```
GET http://localhost:3000/api/v1/seed
```

### 6. Correr app

```bash
# modo desarrollo
$ npm run start

# modo desarrollo watch
$ npm run start:dev

# Modo de produccion
$ npm run start:prod
```

## Stack usado

* MongoDB
* Nest

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Mantente en contacto

- Author - [David Ostos](https://github.com/David-Ostos)
<!-- - Website - [https://nestjs.com](https://github.com/David-Ostos) -->
<!-- - Twitter - [@nestframework](https://twitter.com/nestframework) -->

## Licencia

 [MIT licensed](LICENSE).
