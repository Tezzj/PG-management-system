import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { RoomsModule } from './rooms/rooms.module';
import { ResidenciesModule } from './residencies/residencies.module';
import { RentPaymentsModule } from './rent-payments/rent-payments.module';
import { UtilityBillsModule } from './utility-bills/utility-bills.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { MaintenanceRequestsModule } from './maintenance-requests/maintenance-requests.module';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            level: isProduction ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    PropertiesModule,
    RoomsModule,
    ResidenciesModule,
    RentPaymentsModule,
    UtilityBillsModule,
    AnnouncementsModule,
    MaintenanceRequestsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}