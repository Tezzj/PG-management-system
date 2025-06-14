import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: TokenPayload = request.user;
    const propertyId = request.params.propertyId || request.params.id;

    if (!propertyId) {
      return false;
    }

    const property = await this.prismaService.property.findUnique({
      where: { id: propertyId },
      select: { ownerId: true },
    });

    return property?.ownerId === user.userId;
  }
}