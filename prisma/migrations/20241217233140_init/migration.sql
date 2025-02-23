-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contraseña` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tarea` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tarea` VARCHAR(191) NOT NULL,
    `completada` BOOLEAN NOT NULL DEFAULT false,
    `creada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dia` VARCHAR(191) NOT NULL,
    `duracion` VARCHAR(191) NOT NULL,
    `hora_de_realizacion` VARCHAR(191) NOT NULL,
    `veces_hechas` INTEGER NOT NULL DEFAULT 0,
    `veces_no_hechas` INTEGER NOT NULL DEFAULT 0,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nota` VARCHAR(191) NOT NULL,
    `creada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Objetivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `objetivo` VARCHAR(191) NOT NULL,
    `creada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubTareasObjetivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tarea` VARCHAR(191) NOT NULL,
    `completada` BOOLEAN NOT NULL DEFAULT false,
    `creada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dia` VARCHAR(191) NOT NULL,
    `duracion` VARCHAR(191) NOT NULL,
    `hora_de_realizacion` VARCHAR(191) NOT NULL,
    `veces_hechas` INTEGER NOT NULL DEFAULT 0,
    `veces_no_hechas` INTEGER NOT NULL DEFAULT 0,
    `subTareasId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tarea` ADD CONSTRAINT `Tarea_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Objetivo` ADD CONSTRAINT `Objetivo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubTareasObjetivo` ADD CONSTRAINT `SubTareasObjetivo_subTareasId_fkey` FOREIGN KEY (`subTareasId`) REFERENCES `Objetivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
