CREATE DATABASE Cadastro_Candidatos_RH;

USE Cadastro_Candidatos_RH;

CREATE TABLE Candidatos (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    NomeCompleto NVARCHAR(200) NOT NULL,
    Email NVARCHAR(254) NOT NULL,
    Telefone NVARCHAR(30) NULL,
    CargoDesejado NVARCHAR(150) NULL,
    ResumoProfissional NVARCHAR(MAX) NULL,
    DataCriacao DATETIME2 NOT NULL
        DEFAULT SYSUTCDATETIME()
);