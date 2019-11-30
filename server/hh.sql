drop table transaction;
drop table donation;
drop table merchant;
drop table receiver;

create table receiver (
  rid integer not null primary key,
  uname varchar(50) not null,
  pin integer not null,
  question varchar(50),
  answer varchar(50)
);

create table merchant (
  mid integer not null primary key,
  mname varchar(20) not null
);

create table donation (
  did integer not null primary key,
  amount real not null,
  rid integer not null,
  ts timestamp not null,
  foreign key (rid) references receiver
);

create table transaction (
  tid integer not null primary key,
  rid integer not null,
  mid integer not null,
  ts timestamp not null,
  amount real not null,
  foreign key (rid) references receiver,
  foreign key (mid) references merchant
);

insert into receiver values (999991, 'Kevin', 1234);
insert into receiver values (999992, 'Edmund', 1234);
insert into receiver values (999993, 'Doon', 1234);
insert into receiver values (999994, 'Emma', 1234);
insert into receiver values (999995, 'Gary', 1234);

insert into merchant values (111111, `McDonalds`);
insert into merchant values (111112, `Wendys`);
insert into merchant values (111113, `Arbys`);
insert into merchant values (111114, `Nandos`);
insert into merchant values (111115, `Pizza Hut`);
insert into merchant values (111116, `Gap`);
insert into merchant values (111117, `Old Navy`);
insert into merchant values (111118, `Aritzia`);
insert into merchant values (111119, `The Bay`);
insert into merchant values (111120, `Walmart`);
insert into merchant values (111121, `London Drugs`);
insert into merchant values (111122, `Superstore`);
insert into merchant values (111123, `Target`);
insert into merchant values (111124, `Shoppers Drug Mart`);
insert into merchant values (111125, `Pharmasave`);
insert into merchant values (111126, `Thrifty Foods`);
insert into merchant values (111127, `Trader Joes`);
insert into merchant values (111128, `Best Buy`);
insert into merchant values (111129, `Future Shop`);
insert into merchant values (111130, `Apple Store`);
