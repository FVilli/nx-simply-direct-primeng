import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppService } from './app.service';
import { CoreGateway, CoreModule } from '@simply-direct/nestjs-core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ENV } from './env';

@Module({
  imports: [EventEmitterModule.forRoot({
    wildcard: true,
    newListener: true,
    removeListener: true,
    maxListeners: 10, // the maximum amount of listeners that can be assigned to an event
    verboseMemoryLeak: true, // show event name in memory leak message when more than maximum amount of listeners is assigned
    ignoreErrors: false, // disable throwing uncaughtException if an error event is emitted and it has no listeners
  }),
  CoreModule.forRoot({ 
    port:ENV.PORT, 
    databaseUrl: ENV.DATABASE_URL, 
    jwtSecret: ENV.JWT_SECRET, 
    jwtExpiresIn: ENV.JWT_EXPIRES_IN, 
    skipAuth: ENV.SKIP_AUTH, 
    notAllowedPrismaMethods: ENV.NOT_ALLOWED_PRISMA_METHODS 
  })],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private gtw: CoreGateway, private appService: AppService) {}
  async onApplicationBootstrap() {
    this.gtw.register(this.appService.serviceName, this.appService, false);
  }
}
