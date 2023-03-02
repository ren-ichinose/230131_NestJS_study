import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator((_, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest()
  return user;
})