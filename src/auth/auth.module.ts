import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtsecretkey'
    })
  ],
  controllers: [AuthController],
  providers: [JwtStrategy]
})
export class AuthModule {}

