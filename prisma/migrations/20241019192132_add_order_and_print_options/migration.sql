-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "imageMetadataId" TEXT NOT NULL,
    "printOptionsId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "stripeSessionId" TEXT,
    CONSTRAINT "orders_imageMetadataId_fkey" FOREIGN KEY ("imageMetadataId") REFERENCES "image_metadata" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_printOptionsId_fkey" FOREIGN KEY ("printOptionsId") REFERENCES "print_options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "print_options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);
