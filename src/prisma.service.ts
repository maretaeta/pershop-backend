import {Injectable, OnModuleInit, INestApplication} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    onModuleInit() {
        throw new Error("Method not implemented.");
    }

    async OnModuleInit(){
        await this.$connect();
    }

    async enableShutdownHooks(app:INestApplication){
       process.on('beforeExit', () => {
           app.close()
        })
        
    }
}