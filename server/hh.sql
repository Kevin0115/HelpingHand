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

insert into transaction values (611111, 999991, 111111, "2019-11-30 12:00:00", 222.00);
insert into transaction values (611112, 999992, 111112, "2019-11-30 12:01:00", 223.00);
insert into transaction values (611113, 999993, 111113, "2019-11-30 12:02:00", 224.00);
insert into transaction values (611114, 999994, 111114, "2019-11-30 12:03:00", 225.00);
insert into transaction values (611115, 999995, 111115, "2019-11-30 12:04:00", 226.00);
insert into transaction values (611116, 999991, 111116, "2019-11-30 12:05:00", 227.00);
insert into transaction values (611117, 999992, 111117, "2019-11-30 12:06:00", 228.00);
insert into transaction values (611118, 999993, 111118, "2019-11-30 12:07:00", 229.00);
insert into transaction values (611119, 999994, 111119, "2019-11-30 12:08:00", 230.00);
insert into transaction values (611120, 999995, 111120, "2019-11-30 12:09:00", 231.00);
insert into transaction values (611121, 999991, 111121, "2019-11-30 12:10:00", 232.00);
insert into transaction values (611122, 999992, 111122, "2019-11-30 12:11:00", 233.00);
insert into transaction values (611123, 999993, 111123, "2019-11-30 12:12:00", 234.00);
insert into transaction values (611124, 999994, 111124, "2019-11-30 12:13:00", 235.00);
insert into transaction values (611125, 999995, 111125, "2019-11-30 12:14:00", 236.00);
insert into transaction values (611126, 999991, 111126, "2019-11-30 12:15:00", 237.00);
insert into transaction values (611127, 999992, 111127, "2019-11-30 12:16:00", 238.00);
insert into transaction values (611128, 999993, 111128, "2019-11-30 12:17:00", 239.00);
insert into transaction values (611129, 999994, 111129, "2019-11-30 12:18:00", 240.00);
insert into transaction values (611130, 999995, 111130, "2019-11-30 12:19:00", 241.00);
insert into transaction values (611131, 999991, 111131, "2019-11-30 12:20:00", 242.00);
