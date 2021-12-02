CREATE DATABASE projecte_pelis; 

CREATE TABLE usuari(
    idUsuari int(5) AUTO_INCREMENT UNIQUE NOT NULL, 
    nom varchar(30) NOT NULL,
    cognoms varchar(50),
    email varchar(50) NOT NULL,
    user varchar(30) NOT NULL,
    passw varchar(20) NOT NULL, 
    imatge varchar(100) NOT NULL,
    punts int(10),
    PRIMARY KEY(idUsuari)
); 

CREATE TABLE pelicula(
	idPelicula int(5) AUTO_INCREMENT UNIQUE NOT NULL, 
    nomPelicula varchar(30) NOT NULL,
    any year NOT NULL,
    img varchar(100) NOT NULL,
    PRIMARY KEY(idPelicula)
);

CREATE TABLE partida(
    idPartida int(5) AUTO_INCREMENT UNIQUE NOT NULL, 
    nomPartida varchar(30) NOT NULL,
    pelicules varchar(3000) NOT NULL, 
    fecha datetime NOT NULL,
    PRIMARY KEY(idPartida)
);

CREATE TABLE valoracio_pelicules(
	pelicula int(5) NOT NULL,
    usuari int(5) NOT NULL,
    comentari varchar(200) NOT NULL,
    favorit boolean NOT NULL,
    valoracio int(1) NOT NULL,
    PRIMARY KEY(pelicula, usuari),
    FOREIGN KEY (pelicula) REFERENCES pelicula(idPelicula),
    FOREIGN KEY (usuari) REFERENCES usuari(idUsuari)
);

CREATE TABLE partida_jugada(
    partida int(5) NOT NULL,
    usuari int(5) NOT NULL,
    encerts varchar(50) NOT NULL,
    errades varchar(20) NOT NULL,
    PRIMARY KEY(partida, usuari),
    FOREIGN KEY (partida) REFERENCES partida(idPartida),
    FOREIGN KEY (usuari) REFERENCES usuari(idUsuari)
);
