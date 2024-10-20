-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "imageMetadataId" TEXT NOT NULL,
    "printOptionsId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "stripeSessionId" TEXT,
    CONSTRAINT "orders_imageMetadataId_fkey" FOREIGN KEY ("imageMetadataId") REFERENCES "image_metadata" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_printOptionsId_fkey" FOREIGN KEY ("printOptionsId") REFERENCES "print_options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("createdAt", "id", "imageMetadataId", "printOptionsId", "status", "stripeSessionId", "updatedAt") SELECT "createdAt", "id", "imageMetadataId", "printOptionsId", "status", "stripeSessionId", "updatedAt" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
