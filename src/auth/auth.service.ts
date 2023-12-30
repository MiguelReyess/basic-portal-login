import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  private readonly filePath = './src/user/db/user.json';

  async login(createAuthDto: LoginDto) {
    const usersDB = JSON.parse(fs.readFileSync(path.resolve(this.filePath), { encoding: 'utf-8' }))
    for (const user of usersDB) {
      if (await bcrypt.compare(createAuthDto.password, user.password)) {
        return true
      }
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);;
  }
}
