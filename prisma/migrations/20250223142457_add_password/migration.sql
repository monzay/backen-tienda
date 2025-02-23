/*
  Warnings:

  - You are about to drop the column `contraseña` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `nota` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `objetivo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subtareasobjetivo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tarea` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `nota` DROP FOREIGN KEY `Nota_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `objetivo` DROP FOREIGN KEY `Objetivo_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `subtareasobjetivo` DROP FOREIGN KEY `SubTareasObjetivo_subTareasId_fkey`;

-- DropForeignKey
ALTER TABLE `tarea` DROP FOREIGN KEY `Tarea_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `contraseña`,
    ADD COLUMN `fechaDeRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `rol` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    ADD COLUMN `telefono` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `nota`;

-- DropTable
DROP TABLE `objetivo`;

-- DropTable
DROP TABLE `subtareasobjetivo`;

-- DropTable
DROP TABLE `tarea`;

-- CreateTable
CREATE TABLE `Carrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Carrito_idUsuario_key`(`idUsuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarritoProducto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idCarrito` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direcciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoPostal` INTEGER NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `ciudad` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NULL,
    `calle` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NULL,
    `referencia` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idCategoria` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `fechaDeCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `estado` ENUM('ENVIADO', 'EMPAQUETANDO', 'ENTREGADO', 'CANCELADO', 'PENDIENTE') NOT NULL DEFAULT 'PENDIENTE',
    `idProducto` INTEGER NOT NULL,
    `fechaDeCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaDeEntrega` VARCHAR(191) NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarritoProducto` ADD CONSTRAINT `CarritoProducto_idCarrito_fkey` FOREIGN KEY (`idCarrito`) REFERENCES `Carrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarritoProducto` ADD CONSTRAINT `CarritoProducto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direcciones` ADD CONSTRAINT `Direcciones_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
