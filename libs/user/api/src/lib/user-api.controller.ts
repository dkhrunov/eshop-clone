import { Controller } from '@nestjs/common';
import { UserApiService } from './user-api.service';

@Controller('user-api')
export class UserApiController {
  constructor(private userApiService: UserApiService) {}
}
