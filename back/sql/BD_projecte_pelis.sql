CREATE DATABASE projecte_pelis; 

CREATE TABLE usuari(
    idUsuari int(5) AUTO_INCREMENT UNIQUE NOT NULL, 
    nom varchar(30) NOT NULL,
    cognoms varchar(50),
    email varchar(50) NOT NULL,
    user varchar(30) NOT NULL,
    passw varchar(100) NOT NULL, 
    imatge varchar(100),
    punts int(10),
    PRIMARY KEY(idUsuari)
); 

CREATE TABLE pelicula(
	idPelicula varchar(10) UNIQUE NOT NULL, 
    nomPelicula varchar(30) NOT NULL,
    any year NOT NULL,
    img varchar(1000) NOT NULL,
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
	pelicula varchar(10) NOT NULL,
    usuari int(5) NOT NULL,
    comentari varchar(200) NOT NULL,
    favorit boolean NOT NULL,
    valoracio int(1) NOT NULL,
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


INSERT INTO `usuari` (`idUsuari`, `nom`, `cognoms`, `email`, `user`, `passw`, `imatge`, `punts`) VALUES
(1, 'Victor', 'Moreno', 'a20vicmormor@inspedralbes.cat', 'a20vicmormor', '$2y$10$B0d1N5xzEonV7zFRKqGrIeMB2OxFlXtgWVN0T9HL40fc/rhGCenm.', './front/IMG/congesti�n.jpg', 0),
(2, 'Sandra', 'Ortiz Vega', 's@gmail.com', 'sandra', '$2y$10$kuJS3I1.qEaL0P1HHJcUReMnA3vQJwLilnzfOGTfpLmJbOyiWUva6', './front/IMG/spiderman.jpg', 0),
(3, 'ausias', 'ausias', 'ausias@inspedralbes.cat', 'ausias', '$2y$10$84wOzgHqoq20QZ9qCnd5fOv3QLant2Uv5LzU/E76Ubt8Le.RPhZzW', './front/IMG/InsPedralbes01.jpg', 0),
(4, 'pedra', 'pedra', 'pedra@inspedralbes.cat', 'pedra', '$2y$10$ccDKztqguNAeX/TMCEC8SeHJOj9LdGTSy8HQ0hbfq2tbhPDcrQnqS', './front/IMG/IPLogo.png', 0),
(5, 'Pau', 'Mu�oz Olivares', 'pau@inspedralbes.cat', 'pauchinpun', '$2y$10$L8S7s7BXHUqWNW2neSfwzu5BhW6LK77Db0PnhlWW.zA8q8Mf75JFW', './front/IMG/wallpaper.jpg', 0);

INSERT INTO `pelicula` (`idPelicula`, `nomPelicula`, `any`, `img`) VALUES
('tt0114709', 'Toy Story', 1995, 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg'),
('tt0232500', 'The Fast and the Furious', 2001, 'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'),
('tt0317219', 'Cars', 2006, 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg'),
('tt0463985', 'The Fast and the Furious: Toky', 2006, 'https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg'),
('tt0472462', 'Gol & Gincu', 2005, 'https://m.media-amazon.com/images/M/MV5BMTIwNzk1NDM1OV5BMl5BanBnXkFtZTcwNzkwMzczMQ@@._V1_SX300.jpg'),
('tt1216475', 'Cars 2', 2011, 'https://m.media-amazon.com/images/M/MV5BMTUzNTc3MTU3M15BMl5BanBnXkFtZTcwMzIxNTc3NA@@._V1_SX300.jpg'),
('tt1375666', 'Inception', 2010, 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'),
('tt1905041', 'Fast & Furious 6', 2013, 'https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg'),
('tt2294629', 'Frozen', 2013, 'https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg'),
('tt3353060', 'Stealing Cars', 2015, 'https://m.media-amazon.com/images/M/MV5BMTk3MDg5Mzg5MV5BMl5BanBnXkFtZTgwMjUyMzA5NzE@._V1_SX300.jpg'),
('tt3606752', 'Cars 3', 2017, 'https://m.media-amazon.com/images/M/MV5BMTc0NzU2OTYyN15BMl5BanBnXkFtZTgwMTkwOTg2MTI@._V1_SX300.jpg'),
('tt4520988', 'Frozen II', 2019, 'https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'),
('tt5433138', 'F9: The Fast Saga', 2021, 'https://m.media-amazon.com/images/M/MV5BMjI0NmFkYzEtNzU2YS00NTg5LWIwYmMtNmQ1MTU0OGJjOTMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg');Canvis fets a producció