import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './interfaces/user.interface';

@Controller('user')
export class UserController {
    @Inject()
    private userService: UserService

    @Get()
    getUsers() {
        return this.userService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id)
    }

    @Post()
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number){
        return this.userService.deleteUser(id)
    }

    @Put(':id')
    editUser(@Param('id') id: number, @Body() newUserData: UserDto) {
      return this.userService.editUser(id, newUserData);
    }

}
