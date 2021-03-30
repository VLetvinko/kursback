import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nameRecipe: string;

  @Column({ nullable: true })
  ingredients: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  preparation: string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  titleImage: string;

  @Column({ nullable: true })
  hardLevel: string;

}
