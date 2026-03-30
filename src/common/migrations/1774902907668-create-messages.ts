import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMessages1774902907668 implements MigrationInterface {
  name = 'CreateMessages1774902907668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message_tag" ("id" SERIAL NOT NULL, "label" character varying(40) NOT NULL, CONSTRAINT "PK_22863c35eacd918e08d417950af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "message_tag" ("label") VALUES ('News'), ('Food'), ('Entertainment'), ('Sport'), ('Health'), ('Education')`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" SERIAL NOT NULL, "text" character varying(240) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "author_id" integer NOT NULL, "tag_id" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_05535bc695e9f7ee104616459d3" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_4b38a166a6c29de7ed982ae9dbf" FOREIGN KEY ("tag_id") REFERENCES "message_tag"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_4b38a166a6c29de7ed982ae9dbf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_05535bc695e9f7ee104616459d3"`,
    );
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "message_tag"`);
  }
}
