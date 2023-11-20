import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo deja la data que se esta esperando.
      forbidNonWhitelisted: true, // le manda un mensaje de error con la data que no es requerida.

      transform: true, // estos comandos de transform son para que transforme la data de los dto
      transformOptions: { // a los valores explicitos, por ejemplo los parametors de tipo string a tipo
        enableImplicitConversion: true // number que es lo especificado.
      }
    })
  );

  app.setGlobalPrefix('api/v1');

  const server = await app.listen(process.env.PORT);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  server;

  console.log(`http://localhost:${server.address().port}}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
