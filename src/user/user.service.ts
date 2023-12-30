import { Injectable } from '@nestjs/common';
import { UserDto } from './interfaces/user.interface';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private users: UserDto[]
    private readonly filePath = './src/user/db/user.json';
    constructor() {
        this.users = this.getData()
    }

    async createUser(user: UserDto) {
        user.id = Date.now()
        user.password = await this.hashPassword(user.password)
        this.users.push(user)
        this.saveData(this.users)
        return user
    }

    deleteUser(id: number) {
        this.users = this.users.filter((user) => user.id != id);
        return this.saveData(this.users)
    }

    async editUser(id: number, newData: UserDto) {
        const index = this.users.findIndex(obj => obj.id == id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...newData, password: (await bcrypt.hash(newData.password, 10)) };
            this.saveData(this.users)
            return this.users;
        } else {
            throw new Error(`Objeto con id ${id} no encontrado.`);
        }
    }

    getUsers() {
        return this.users.map(user => ({ email: user.email, id: user.id, name: user.name }))
    }

    getUser(id: number) {
        return this.users.filter((user) => user.id == id).map(user => ({ email: user.email, id: user.id, name: user.name }))
    }
    getData(): any {
        const data = fs.readFileSync(path.resolve(this.filePath), { encoding: 'utf-8' })
        return JSON.parse(data)
    }

    private saveData(users: UserDto[]) {
        const newUsers = JSON.stringify(users, null, 2);
        fs.writeFileSync(this.filePath, newUsers, 'utf-8');
        return newUsers
    }

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }
}

