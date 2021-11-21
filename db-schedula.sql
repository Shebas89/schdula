CREATE DATABASE `db-schedula` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- `db-schedula`.usuarios definition

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `apellido_usuario` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `telefono_usuario` varchar(10) COLLATE utf8mb4_bin NOT NULL,
  `email_usuario` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `status_usuario` enum('Activo','Inactivo') COLLATE utf8mb4_bin NOT NULL,
  `password_usuario` varchar(10) COLLATE utf8mb4_bin NOT NULL,
  `identificacion_usuario` varchar(10) COLLATE utf8mb4_bin NOT NULL,
  `tipoIdentificacion_usuario` enum('Cédula ciudadanía','Cédula extranjería','Tarjeta identidad') COLLATE utf8mb4_bin NOT NULL,
  `recuperar_password_usuario` tinyint(1) NOT NULL,
  `rol_usuario` enum('Cliente','Empleado','Administrador') COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='Usuarios en la aplicación SCHEDULA';

-- `db-schedula`.empresas definition

CREATE TABLE `empresas` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(45) NOT NULL,
  `ciudad_empresa` varchar(45) NOT NULL,
  `direccion_empresa` varchar(45) DEFAULT NULL,
  `telefono_empresa` varchar(45) DEFAULT NULL,
  `email_empresa` varchar(45) DEFAULT NULL,
  `categoria_empresa` enum('Centro de belleza','Veterinaria','Lavanderia') DEFAULT NULL,
  `status_empresa` enum('Activo','Desvinculado','Inactivo') DEFAULT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_empresa`),
  UNIQUE KEY `id_empresa_UNIQUE` (`id_empresa`),
  KEY `id_usuario_idx` (`id_usuario`),
  CONSTRAINT `Fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin CCOMMENT='Negocios en la aplicación SCHEDULA';

-- `db-schedula`.servicios definition

CREATE TABLE `servicios` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre_servicio` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `descripcion_servicio` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `categoria_servicio` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `id_empresa` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_servicio`),
  KEY `servicio_usuario_FK` (`id_usuario`),
  KEY `servicio_empresa_FK` (`id_empresa`),
  CONSTRAINT `servicio_empresa_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `servicio_usuario_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='Servicios en la aplicación SCHEDULA';

-- `db-schedula`.agenda definition

CREATE TABLE `agenda` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `hora` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `estado` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `id_usuario` int NOT NULL,
  `id_servicio` int NOT NULL,
  `id_empleado` int NOT NULL,
  `id_empresa` int NOT NULL,
  PRIMARY KEY (`id_reserva`),
  UNIQUE KEY `id_empleado_UNIQUE` (`id_empleado`),
  KEY `agenda_empresa_FK` (`id_empresa`),
  KEY `agenda_usuario_FK` (`id_usuario`),
  KEY `agenda_servicios_FK` (`id_servicio`),
  CONSTRAINT `agenda_empresa_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `agenda_servicios_FK` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`),
  CONSTRAINT `agenda_usuario_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='Reservas en la aplicación SCHEDULA';