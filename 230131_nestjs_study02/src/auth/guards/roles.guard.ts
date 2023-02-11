import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(ctx: ExecutionContext): boolean {
        const requiredStatuses = this.reflector.get<string[]>(
            'status',
            ctx.getHandler()
        );

        const { user } = ctx.switchToHttp().getRequest();
        return requiredStatuses.some((status) => user.status.includes(status)) 
    }
}