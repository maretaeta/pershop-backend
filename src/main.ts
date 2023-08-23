import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(4000);
// }

async function bootstrap() {
const app = await NestFactory.create(AppModule);

const cors = {
    origin: ['http://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
}

app.enableCors(cors)
app.listen(3000)
.then(() => {
console.log("successfully stared on port 3000");
})
.catch((error) => {
console.log(error);
})
}

bootstrap();
