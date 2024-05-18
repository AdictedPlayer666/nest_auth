import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class getDataGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
  
    return true; 
  }
}