import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GatewayClientService } from '@common/fabric';
import { GrpcClientService } from '@common/grpc';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [GatewayClientService, GrpcClientService],
    exports: [GatewayClientService],
})
export class CommonModule {}
