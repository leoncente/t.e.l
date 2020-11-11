/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     10/20/2020 8:07:19 PM                        */
/*==============================================================*/

--create database TEL_DB;
--drop index MATERIA_PK;

--drop table MATERIA;

--drop index DICTA_FK;

--drop index TIENE_FK;

--drop table MATERIA_TUTOR;

--drop index TUTOR_PK;

--drop table TUTOR;

/*==============================================================*/
/* Table: MATERIA                                               */
/*==============================================================*/
create table MATERIA (
   CODMAT               VARCHAR(7)           not null,
   NOMBRE               VARCHAR(20)          null,
   constraint PK_MATERIA primary key (CODMAT)
);

/*==============================================================*/
/* Index: MATERIA_PK                                            */
/*==============================================================*/
create unique index MATERIA_PK on MATERIA (
CODMAT
);

/*==============================================================*/
/* Table: MATERIA_TUTOR                                         */
/*==============================================================*/
create table MATERIA_TUTOR (
   CODMAT               VARCHAR(7)           not null,
   NOM_USU              VARCHAR(20)          not null
);

/*==============================================================*/
/* Index: TIENE_FK                                              */
/*==============================================================*/
create  index TIENE_FK on MATERIA_TUTOR (
CODMAT
);

/*==============================================================*/
/* Index: DICTA_FK                                              */
/*==============================================================*/
create  index DICTA_FK on MATERIA_TUTOR (
NOM_USU
);

/*==============================================================*/
/* Table: TUTOR                                                 */
/*==============================================================*/
create table TUTOR (
   NOMBRE               VARCHAR(20)          null,
   APELLIDO             VARCHAR(20)          null,
   TELF                 INT4                 null,
   CORREO               VARCHAR(50)          null,
   NOM_USU              VARCHAR(20)          not null,
   CONTRA               VARCHAR(16)          null,
   constraint PK_TUTOR primary key (NOM_USU)
);

/*==============================================================*/
/* Index: TUTOR_PK                                              */
/*==============================================================*/
create unique index TUTOR_PK on TUTOR (
NOM_USU
);

alter table MATERIA_TUTOR
   add constraint FK_MATERIA__DICTA_TUTOR foreign key (NOM_USU)
      references TUTOR (NOM_USU)
      on delete restrict on update restrict;

alter table MATERIA_TUTOR
   add constraint FK_MATERIA__TIENE_MATERIA foreign key (CODMAT)
      references MATERIA (CODMAT)
      on delete restrict on update restrict;

