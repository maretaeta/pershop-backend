import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class BarangTransaksiDto {
  @IsNotEmpty()
  id_barang: number;

  @IsNotEmpty()
  jumlah_barang: number;
}


export class CreateTransaksiDto {
  @IsNotEmpty()
  tanggal: Date;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  totalHarga: number;

  @IsArray()
  @ArrayMinSize(1)
  barangTransaksi: BarangTransaksiDto[];
}
