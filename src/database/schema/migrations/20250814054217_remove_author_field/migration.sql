/*
  Warnings:

  - You are about to drop the column `author` on the `posts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "thumb" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_posts" ("body", "createdAt", "id", "summary", "thumb", "title", "updatedAt") SELECT "body", "createdAt", "id", "summary", "thumb", "title", "updatedAt" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
