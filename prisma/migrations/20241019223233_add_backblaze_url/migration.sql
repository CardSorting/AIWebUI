/*
  Warnings:

  - Added the required column `backblazeUrl` to the `image_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_image_metadata" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "prompt" TEXT NOT NULL,
    "seed" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "backblazeUrl" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "hasNsfwConcepts" TEXT NOT NULL,
    "fullResult" TEXT NOT NULL
);
INSERT INTO "new_image_metadata" ("contentType", "createdAt", "fullResult", "hasNsfwConcepts", "height", "id", "imageUrl", "prompt", "seed", "updatedAt", "width") SELECT "contentType", "createdAt", "fullResult", "hasNsfwConcepts", "height", "id", "imageUrl", "prompt", "seed", "updatedAt", "width" FROM "image_metadata";
DROP TABLE "image_metadata";
ALTER TABLE "new_image_metadata" RENAME TO "image_metadata";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
