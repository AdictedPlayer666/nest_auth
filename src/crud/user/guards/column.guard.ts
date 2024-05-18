import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class ColumnGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
 
    return true; 
  }
}