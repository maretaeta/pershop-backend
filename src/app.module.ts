import { Module } from '@nestjs/common';
import { BarangModule } from './barang/barang.module';

@Module({
  imports: [BarangModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 