drop table transaction;
drop table donation;
drop table merchant;
drop table receiver;

create table receiver (
  rid integer not null primary key,
  uname varchar(50) not null,
  balance real constraint sufficient_balance check (balance >= 0) not null,
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

insert into receiver values (999991, 'Kevin', 20.00, 1234);
insert into receiver values (999992, 'Edmund', 20.00, 1234);
insert into receiver values (999993, 'Doon', 20.00, 1234);
insert into receiver values (999994, 'Emma', 20.00, 1234);
insert into receiver values (999995, 'Gary', 20.00, 1234);

insert into merchant values (111111, 'McDonalds');
insert into merchant values (111112, 'Wendys');
insert into merchant values (111113, 'Arbys');
insert into merchant values (111114, 'Nandos');
insert into merchant values (111115, 'Pizza Hut');
insert into merchant values (111116, 'Gap');
insert into merchant values (111117, 'Old Navy');
insert into merchant values (111118, 'Aritzia');
insert into merchant values (111119, 'The Bay');
insert into merchant values (111120, 'Walmart');
insert into merchant values (111121, 'London Drugs');
insert into merchant values (111122, 'Superstore');
insert into merchant values (111123, 'Target');
insert into merchant values (111124, 'Shoppers Drug Mart');
insert into merchant values (111125, 'Pharmasave');
insert into merchant values (111126, 'Thrifty Foods');
insert into merchant values (111127, 'Trader Joes');
insert into merchant values (111128, 'Best Buy');
insert into merchant values (111129, 'Future Shop');
insert into merchant values (111130, 'Apple Store');

insert into donation values(333331, 20.00, 999991, '2019-11-30 12:00:00');
insert into donation values(333332, 25.00, 999992, '2019-11-30 12:30:00');
insert into donation values(333333, 0.50, 999991, '2019-11-30 12:35:00');
insert into donation values(333334, 0.25, 999991, '2019-11-30 12:40:00');
insert into donation values(333335, 0.10, 999992, '2019-11-30 12:45:00');
insert into donation values(333336, 14.00, 999993, '2019-11-30 12:50:00');
insert into donation values(333337, 15.00, 999994, '2019-11-30 12:55:00');
insert into donation values(333338, 29.00, 999993, '2019-11-30 13:00:00');
insert into donation values(333339, 13.50, 999991, '2019-11-30 13:05:00');
insert into donation values(333340, 50.00, 999995, '2019-11-30 13:10:00');
insert into donation values(333341, 60.00, 999994, '2019-11-30 13:30:00');
insert into donation values(333342, 30.00, 999993, '2019-11-30 13:45:00');
insert into donation values(333343, 25.00, 999994, '2019-11-30 13:50:00');
insert into donation values(333344, 10.00, 999993, '2019-11-30 13:55:00');
insert into donation values(333345, 90.00, 999992, '2019-11-30 14:15:00');

insert into transaction values (611111, 999991, 111111, '2019-11-30 12:00:00', 2.00);
insert into transaction values (611112, 999992, 111112, '2019-11-30 12:01:00', 3.00);
insert into transaction values (611113, 999993, 111113, '2019-11-30 12:02:00', 4.00);
insert into transaction values (611114, 999994, 111114, '2019-11-30 12:03:00', 5.00);
insert into transaction values (611115, 999995, 111115, '2019-11-30 12:04:00', 6.00);
insert into transaction values (611116, 999991, 111116, '2019-11-30 12:05:00', 7.00);
insert into transaction values (611117, 999992, 111117, '2019-11-30 12:06:00', 8.00);
insert into transaction values (611118, 999993, 111118, '2019-11-30 12:07:00', 9.00);
insert into transaction values (611119, 999994, 111119, '2019-11-30 12:08:00', 3.00);
insert into transaction values (611120, 999995, 111120, '2019-11-30 12:09:00', 1.00);
insert into transaction values (611121, 999991, 111121, '2019-11-30 12:10:00', 2.00);
insert into transaction values (611122, 999992, 111122, '2019-11-30 12:11:00', 3.00);
insert into transaction values (611123, 999993, 111123, '2019-11-30 12:12:00', 4.00);
insert into transaction values (611124, 999994, 111124, '2019-11-30 12:13:00', 5.00);
insert into transaction values (611125, 999995, 111125, '2019-11-30 12:14:00', 6.00);
insert into transaction values (611126, 999991, 111126, '2019-11-30 12:15:00', 7.00);
insert into transaction values (611127, 999992, 111127, '2019-11-30 12:16:00', 8.00);
insert into transaction values (611128, 999993, 111128, '2019-11-30 12:17:00', 9.00);
insert into transaction values (611129, 999994, 111129, '2019-11-30 12:18:00', 3.00);
insert into transaction values (611130, 999995, 111130, '2019-11-30 12:19:00', 1.00);