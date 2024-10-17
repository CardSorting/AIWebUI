/*
  Warnings:

  - You are about to drop the `ImageMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ImageMetadata";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "image_metadata" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "prompt" TEXT NOT NULL,
    "seed" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "hasNsfwConcepts" TEXT NOT NULL,
    "fullResult" TEXT NOT NULL
);
