import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
      JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
          global: true,
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: configService.get<string>('jwt.expireTime')
          }
        }),
        inject: [ConfigService]
      })
    ],
    exports: [JwtModule]
})

export class JwtProviderModule {}