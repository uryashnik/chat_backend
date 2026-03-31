import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1774868830492 implements MigrationInterface {
  name = 'CreateUsers1774868830492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "email" character varying(40) NOT NULL, "password" character varying NOT NULL, "first_name" character varying(40) NOT NULL, "last_name" character varying(40) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
  }
}
