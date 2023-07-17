

CREATE DATABASE DB_ACCESO;

DROP DATABASE DB_ACCESO;

USE DB_ACCESO;

CREATE TABLE Usuario (
IdUsuario INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
Correo VARCHAR(50) NOT NULL,
Clave VARCHAR(50) NOT NULL)

 CREATE PROC SP_RegistarUsuario(
 @Correo VARCHAR(50) ,
 @Clave VARCHAR(50) ,
 @Registrado BIT OUTPUT ,
 @Mensaje VARCHAR(50) OUTPUT 
 )
 AS
 BEGIN
 	IF (NOT EXISTS(SELECT * FROM Usuario WHERE Correo = @Correo))
 	BEGIN
 		INSERT INTO Usuario(Correo,Clave) VALUES (@Correo,@Clave)
 		SET @Registrado = 1
 		SET @Mensaje = 'Usuario Registrado'
 	END
 	ELSE
 	BEGIN
 		SET @Registrado = 0
 		SET @Mensaje = 'Correo ya existe'
 	END;
 END;

 CREATE PROC SP_ValidarUsuario(
 @Correo VARCHAR(50),
 @Clave VARCHAR(50) )
 AS
 BEGIN
 	IF(EXISTS(SELECT * FROM Usuario WHERE Correo = @Correo AND CLave = @Clave))
 		SELECT IdUsuario FROM Usuario WHERE Correo = @Correo AND Clave = @Clave
 	ELSE 
 		SELECT '0'
 END;

 DECLARE @Registrado BIT , @Mensaje VARCHAR(50)
 EXEC SP_RegistarUsuario 'Yesenia@gmail.com','password123',@Registrado OUTPUT,@Mensaje OUTPUT
 SELECT @Registrado;
 SELECT @Mensaje;

 SELECT * FROM Usuario;

 drop table Usuario;


 EXEC SP_ValidarUsuario 'Mauricio@gmail.com','password123';
 EXEC SP_ValidarUsuario 'Jose@gmail.com','password123';
 EXEC SP_ValidarUsuario 'Luz@gmail.com','password123';
 EXEC SP_ValidarUsuario 'Yesenia@gmail.com','password123';













---- CREATE TABLE HistorialBusquedas (
----     Numero_Fila INT IDENTITY(1,1) PRIMARY KEY,
----     Nombre_Empresa VARCHAR(50),
----     Total_Empleos INT,
----     Fecha_Busqueda DATE
---- );
---- INSERT INTO HistorialBusquedas (Nombre_Empresa, Total_Empleos, Fecha_Busqueda)
---- VALUES ('Empresa A', 10, '2023-07-12');

---- SELECT Numero_Fila, Nombre_Empresa, Total_Empleos, Fecha_Busqueda
---- FROM HistorialBusquedas;

---- SELECT COUNT(*) AS total_registros
---- FROM HistorialBusquedas;

---- Ascendente
---- SELECT Numero_Fila, Nombre_Empresa, Total_Empleos, Fecha_Busqueda
---- FROM HistorialBusquedas
---- ORDER BY Fecha_Busqueda ASC;

---- Descendente
---- SELECT Numero_Fila, Nombre_Empresa, Total_Empleos, Fecha_Busqueda
---- FROM HistorialBusquedas
---- ORDER BY Fecha_Busqueda DESC;


---- SELECT Numero_Fila, Nombre_Empresa, Total_Empleos, Fecha_Busqueda
---- FROM HistorialBusquedas;




-- CREATE TABLE CompanyA (
--     Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
--     Position1 VARCHAR(50),
--     Position2 VARCHAR(50),
--     Position3 VARCHAR(50),
--     Salary DECIMAL(10,2),
--     Location VARCHAR(50)
-- );
--GO

--CREATE TABLE CompanyB (
--    Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
--    Position1 VARCHAR(50),
--    Position2 VARCHAR(50),
--    Position3 VARCHAR(50),
--    Salary DECIMAL(10,2),
--    Location VARCHAR(50)
--);
--GO

--CREATE TABLE CompanyC (
--    Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
--    Position1 VARCHAR(50),
--    Position2 VARCHAR(50),
--    Position3 VARCHAR(50),
--    Salary DECIMAL(10,2),
--    Location VARCHAR(50)
--);
--GO

--INSERT INTO CompanyA (Position1, Position2, Position3, Salary, Location)
--VALUES ('Position A1', 'Position A2', 'Position A3', 5000, 'Location A');
--GO

--INSERT INTO CompanyB (Position1, Position2, Position3, Salary, Location)
--VALUES ('Position B1', 'Position B2', 'Position B3', 6000, 'Location B');
--GO

--INSERT INTO CompanyC (Position1, Position2, Position3, Salary, Location)
--VALUES ('Position C1', 'Position C2', 'Position C3', 7000, 'Location C');
--GO

--SELECT *
--FROM CompanyB;
--GO

--SELECT *
--FROM CompanyA
--JOIN CompanyB ON CompanyA.Id = CompanyB.Id;
--GO

--SELECT *
--FROM CompanyB
--JOIN CompanyC ON CompanyB.Id = CompanyC.Id;
--GO
