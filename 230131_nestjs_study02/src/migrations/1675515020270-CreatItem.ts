import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatItem1675515020270 implements MigrationInterface {
    name = 'CreatItem1675515020270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "creatAt" character varying NOT NULL, "updateAt" character varying NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
