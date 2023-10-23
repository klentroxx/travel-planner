import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateItinerariesTable1698060739524 implements MigrationInterface {
  /**
   * Name of the table to be created
   *
   * @private
   */
  private readonly TABLE_NAME = 'itineraries'

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
            name: 'userId',
            type: 'bigint',
          },
          {
            name: 'destination',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'startDate',
            type: 'datetime',
          },
          {
            name: 'endDate',
            type: 'datetime',
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
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
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
