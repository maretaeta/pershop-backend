import { Module } from '@nestjs/common';
import { BarangModule } from './barang/barang.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BarangModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 