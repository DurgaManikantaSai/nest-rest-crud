import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository,  } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,){

    }

    async create(user: User) : Promise<User> {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where : { id } 
        });
    }

    //update User
    async update(id: number, user: User): Promise<User> {
        await this.userRepository.update(id, user);
        return await this.userRepository.findOne({where: {id}});
    }

    //delete user;
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
