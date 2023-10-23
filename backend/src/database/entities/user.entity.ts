import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Itinerary } from "./itinerary.entity";

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  @Unique(['username'])
  username: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Itinerary, (itinerary) => itinerary.user)
  itineraries: Array<Itinerary>

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
