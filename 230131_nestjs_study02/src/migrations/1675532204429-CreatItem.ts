import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatItem1675532204429 implements MigrationInterface {
    name = 'CreatItem1675532204429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "creatAt"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "createdAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD "updatedAt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "updateAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD "creatAt" character varying NOT NULL`);
    }

}
