import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
const app = await NestFactory.create(AppModule);

// const cors = {
//     origin: ['http://localhost:3000'],
//     methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
// }

// app.enableCors(cors)
// app.listen(3000)
// .then(() => {
// console.log("successfully stared on port 3000");
// })
// .catch((error) => {
// console.log(error);
// })
// }

// bootstrap();


const config = new DocumentBuilder()
    .setTitle('Pershop Documentation API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

 
  const cors = {
    origin: ['http://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  };
  app.enableCors(cors);

  await app.listen(3000);
}

bootstrap();