import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';

export const AuthorizationGuard = (roles: string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      if (!roles) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const user = request.currentUser;

      return roles.some((role) => user.roles.includes(role));
    }
  }

  return mixin(RolesGuardMixin);
};
