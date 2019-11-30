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
