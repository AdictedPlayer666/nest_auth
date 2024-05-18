import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class getDataGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Add your guard logic here, returning true or false based on conditions
    return true; // Return true to allow access, or false to block access
  }
}