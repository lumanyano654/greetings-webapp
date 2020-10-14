create table greeting(
    id serial not null primary key,
    name_greeted text not null,
    name_counter int not null
)
-- 'insert into greeting(name_greeted, name_counter) values ($1,$2)', ['makho', 1]





