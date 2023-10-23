import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateItineraryActivitiesTable1698060750414 implements MigrationInterface {
  /**
   * Name of the table to be created
   *
   * @private
   */
  private readonly TABLE_NAME = 'itineraryActivities'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'itineraryId',
            type: 'bigint',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'startTime',
            type: 'datetime',
          },
          {
            name: 'endTime',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP(6)',
            precision: 6,
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            isNullable: true,
            onUpdate: 'CURRENT_TIMESTAMP(6)',
            precision: 6,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['itineraryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'itineraries',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }

}
