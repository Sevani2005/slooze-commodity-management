import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // In production, use environment variables
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
