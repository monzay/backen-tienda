/*
  Warnings:

  - Added the required column `barrio` to the `Direcciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Direcciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Direcciones` table without a default value. This is not possible if the table is not empty.
  - Made the column `provincia` on table `direcciones` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tipo` on table `direcciones` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `stock` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `direcciones` ADD COLUMN `barrio` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefono` VARCHAR(191) NOT NULL,
    MODIFY `provincia` VARCHAR(191) NOT NULL,
    MODIFY `tipo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `stock` INTEGER NOT NULL;
