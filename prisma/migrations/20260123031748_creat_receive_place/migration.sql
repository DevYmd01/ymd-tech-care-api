-- CreateTable
CREATE TABLE "receive_place" (
    "receive_place_id" SERIAL NOT NULL,
    "receive_place_code" VARCHAR(30) NOT NULL,
    "receive_place_name" VARCHAR(200) NOT NULL,
    "receive_place_nameeng" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receive_place_pkey" PRIMARY KEY ("receive_place_id")
);
