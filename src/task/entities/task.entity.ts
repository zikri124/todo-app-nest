import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from "typeorm";

export enum TaskStatus {
    COMPLETE = "COMPLETE",
    NOT_COMPLETE = "NOT_COMPLETE"
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(type => User, user => user.tasks)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: 'id'
    })
    user: User;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.NOT_COMPLETE
    })
    status: string;

    @Column('text')
    content: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}
