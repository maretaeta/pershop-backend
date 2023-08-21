import { Module } from "@nestjs/common";
import { BarangController } from "./barang.controller";
import { barangService } from "./barang.service";
import { PrismaService } from "src/prisma.service";


@Module ({
    controllers:[BarangController],
    providers: [barangService, PrismaService]
})

export class BarangModule{}