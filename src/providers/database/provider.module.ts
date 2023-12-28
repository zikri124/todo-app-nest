import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.database'),
                logging: true,
                synchronize: configService.get<string>('database.sync'),
                autoLoadEntities: true,
                migrations: ['/src/database/migrations/*.ts'],
                migrationsTableName: 'migrations_TypeORM',
                cli: {
                    migrationDir: '/src/database/migrations/'
                }
            }),
            inject: [ConfigService],
        } as TypeOrmModuleAsyncOptions),
    ]
})
export class ProviderModule { }
