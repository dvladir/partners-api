import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { ConfigModule } from '@nestjs/config';
import { PgDbModule } from '@db/pg-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
    }),
    PgDbModule,
    ApiModule,
  ],
})
export class AppModule {}
