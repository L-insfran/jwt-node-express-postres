DROP TABLE IF EXISTS RESERVATIONS;
DROP TABLE IF EXISTS PETS;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS ROLES;

CREATE TABLE ROLES (
  RID SERIAL PRIMARY KEY,
  NAME VARCHAR(50) NOT NULL UNIQUE CHECK (NAME IN('ADMIN','VET','CLIENT'))
);

CREATE TABLE USERS (
  UID SERIAL PRIMARY KEY,
  EMAIL VARCHAR(50) NOT NULL UNIQUE,
  PASSWORD VARCHAR(60) NOT NULL,
  USERNAME VARCHAR(50) NOT NULL,
  ROLE_ID INT NOT NULL DEFAULT 3,
  FOREIGN  KEY (ROLE_ID) REFERENCES ROLES(RID)
);

CREATE TABLE PETS (
  PID SERIAL PRIMARY KEY,
  NAME VARCHAR(50) NOT NULL,
  SPECIES VARCHAR(50) NOT NULL,
  BREED VARCHAR(50) NOT NULL,
  OWNER INT NOT NULL,
  FOREIGN KEY (OWNER) REFERENCES USERS(UID)
);

CREATE TABLE RESERVATIONS (
  RID SERIAL PRIMARY KEY,
  PET INT NOT NULL,
  VET INT NOT NULL,
  RESERVATIONS_DATE DATE NOT NULL,
  DESCRIPTION TEXT,
  FOREIGN KEY (PET) REFERENCES PETS(PID),
  FOREIGN KEY (VET) REFERENCES USERS(UID)
);

INSERT INTO ROLES (NAME) VALUES ('ADMIN');
INSERT INTO ROLES (NAME) VALUES ('VET');
INSERT INTO ROLES (NAME) VALUES ('CLIENT');

SELECT * FROM USERS;

-- CREAR VÍA API:
-- admin@admin.com, vet_1@vet.com, client_1@client.com

--ACTUALIZAR ROLE ADMIN
UPDATE USERS
SET ROLE_ID = 1
WHERE EMAIL = 'admin@admin.com';