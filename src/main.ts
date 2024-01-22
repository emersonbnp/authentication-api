import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  if (process.env.SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Authentication API')
      .setDescription('API to generate JWT tokens signed with a private key')
      .setVersion('1.0')
      .addTag('authentication api')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(8082);

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}
bootstrap();
