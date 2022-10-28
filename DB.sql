use ivema;
-- -- show tables;

select * from service;


create database angularNode;
use angularNode;

-- drop table personneii; 
CREATE TABLE personne(
id int(22) not null auto_increment primary key,
nom varchar(200) NOT NULL,
prenom VARCHAR (200) not null,
age int(22) not null,
email varchar (233) not null

)engine=InnoDB;


insert into personne(`id`,`nom`,`prenom`,`age`,`email`)
values (NULL,'GOGO','Daniel',22,'danielgogo42@gmail.com'
),
(NULL,'Alice','Adoddanou',20,'adodanouAlive12@gmail.com'),
(NULL,'Lil','Gimbe',22,'bboygimbe@gmail.com')
;


use angularNode;
 -- select * from personne;
  select * from categorie;
select * from personne where id =2;
-- delete from personne where id = 6;