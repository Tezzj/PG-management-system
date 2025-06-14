import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
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
      include: { moderators: { where: { id: user.userId } } },
    });

    if (!property) {
      return false;
    }

    return (
      property.ownerId === user.userId || property.moderators.length > 0
    );
  }
}