/*
  Warnings:

  - A unique constraint covering the columns `[ean]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_ean_key" ON "products"("ean");
