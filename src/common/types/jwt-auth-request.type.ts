import { UserEntity } from '../entities/user.entity';

export class AuthRequest extends Request {
  user: UserEntity;
}
