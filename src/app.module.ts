import { Module } from '@nestjs/common';
import { BarangModule } from './barang/barang.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransaksiModule } from "./transaksi/transaksi.module"

@Module({
  imports: [BarangModule, UsersModule, AuthModule, TransaksiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 