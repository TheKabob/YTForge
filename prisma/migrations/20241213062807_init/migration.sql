-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "video_name" TEXT,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
