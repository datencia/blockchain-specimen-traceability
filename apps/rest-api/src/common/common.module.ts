import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GatewayClientService } from './fabric';
import { GrpcClientService } from './grpc';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [GatewayClientService, GrpcClientService],
    exports: [GatewayClientService],
})
export class CommonModule {}
