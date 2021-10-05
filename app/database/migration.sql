CREATE TABLE IF NOT EXISTS users (
    id int(11) not null auto_increment,
    name varchar(255),
    password text,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);