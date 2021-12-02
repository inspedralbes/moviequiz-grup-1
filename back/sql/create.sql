CREATE DATABASE projecte_pelis; 

CREATE TABLE persona(
    idPersona int(5) AUTO_INCREMENT UNIQUE NOT NULL, 
    nom varchar(30) NOT NULL,
    cognoms varchar(50),
    email varchar(50) NOT NULL,
    passw varchar(20) NOT NULL, 
    PRIMARY KEY(idPersona)
); 

CREATE TABLE pelicula(
	idPelicula int(5) AUTO_INCREMENT UNIQUE NOT NULL, 
    nom varchar(30) NOT NULL,
    any year NOT NULL,
    img varchar(100) NOT NULL,
    PRIMARY KEY(idPelicula)
);

CREATE TABLE valoracio_pelicules(
	pelicula int(5) NOT NULL,
    persona int(5) NOT NULL,
    comentari varchar(200),
    valoracio int(1),
    PRIMARY KEY(pelicula, persona),
    FOREIGN KEY (pelicula) REFERENCES pelicula(idPelicula),
    FOREIGN KEY (persona) REFERENCES persona(idPersona)
);

CREATE TABLE guardar_pelicules(
    pelicula int(5) NOT NULL,
    persona int(5) NOT NULL,
    PRIMARY KEY(pelicula, persona),
    FOREIGN KEY (pelicula) REFERENCES pelicula(idPelicula),
    FOREIGN KEY (persona) REFERENCES persona(idPersona)
);

CREATE TABLE joc(
    idJoc int(5) AUTO_INCREMENT UNIQUE NOT NULL, 
    nom varchar(30) NOT NULL,
    encerts varchar(50) NOT NULL,
    errades varchar(20) NOT NULL, 
    fecha datetime NOT NULL,
    PRIMARY KEY(idJoc)
);

CREATE TABLE pelicula_joc(
    pelicula int(5) NOT NULL,
    joc int(5) NOT NULL,
    PRIMARY KEY(pelicula, joc),
    FOREIGN KEY (pelicula) REFERENCES pelicula(idPelicula),
    FOREIGN KEY (joc) REFERENCES joc(idJoc)
);

CREATE TABLE usuari_joc(
    joc int(5) NOT NULL,
    persona int(5) NOT NULL,
    PRIMARY KEY(joc, persona),
    FOREIGN KEY (joc) REFERENCES joc(idJoc),
    FOREIGN KEY (persona) REFERENCES persona(idPersona)
);