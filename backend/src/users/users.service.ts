import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {User} from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne({where: {id: id}}): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    findOneByName(name: string): Promise<User | undefined> {
        return this.usersRepository.findOne({where: {name}});
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
