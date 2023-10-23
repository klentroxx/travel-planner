import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from "./user.entity";
import { ItineraryActivity } from "./itinerary-activity.entity";

@Entity({
  name: 'itineraries',
})
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.itineraries, { eager: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column('varchar')
  destination: string;

  @Column('datetime')
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @OneToMany(() => ItineraryActivity, (activity) => activity.itinerary)
  activities: Array<ItineraryActivity>

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
