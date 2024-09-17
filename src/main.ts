import { NestFactory } from '@nestjs/core';
import { MainModule } from './module/main.module';


async function bootstrap() {
    console.log('Starting server...')
    const app = await NestFactory.create(MainModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: false
    });
    await app.listen(3001);
}
bootstrap();