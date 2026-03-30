import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1774866254995 implements MigrationInterface {
  name = 'CreateUser1774866254995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_entity_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "gender" "public"."user_entity_gender_enum" NOT NULL, "email" character varying(40) NOT NULL, "password" character varying NOT NULL, "first_name" character varying(40) NOT NULL, "last_name" character varying(40) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TYPE "public"."user_entity_gender_enum"`);
  }
}
