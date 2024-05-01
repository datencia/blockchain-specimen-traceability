import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GrpcClientService } from './grpc-client.service';
import { GatewayClientService } from './gateway-client.service';

@Module({
    imports: [ConfigModule],
    providers: [GatewayClientService, GrpcClientService],
    exports: [GatewayClientService],
})
export class FabricModule {}
