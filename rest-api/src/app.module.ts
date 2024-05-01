import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationOptions, validationSchema } from './config';
import { FabricModule } from './fabric/fabric.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema,
            validationOptions,
        }),
        FabricModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
