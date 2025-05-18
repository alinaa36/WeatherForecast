import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747235224522 implements MigrationInterface {
    name = 'Migration1747235224522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "city" character varying NOT NULL, "frequency" character varying NOT NULL, "unsubscribeToken" character varying, "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "confirmed" character varying NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "confirmationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "confirmationToken"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "confirmed"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
    }

}
