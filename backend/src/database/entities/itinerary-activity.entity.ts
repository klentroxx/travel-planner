import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Itinerary } from "./itinerary.entity";

@Entity({
  name: 'itineraryActivities',
})
export class ItineraryActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.activities, { eager: true })
  @JoinColumn({ name: 'itineraryId', referencedColumnName: 'id' })
  itinerary: Itinerary;

  @Column('varchar')
  name: string;

  @Column('datetime')
  startTime: Date;

  @Column('datetime', { nullable: true })
  endTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
