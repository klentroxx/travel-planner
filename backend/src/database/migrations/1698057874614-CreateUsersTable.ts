import { MigrationInterface, QueryRunner, Table } from "typeorm"

/**
 * Create users table for multi-user application support
 */
export class CreateUsersTable1698057874614 implements MigrationInterface {
  /**
   * Name of the table to be created
   *
   * @private
   */
  private readonly TABLE_NAME = 'users'

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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
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
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }

}
