CREATE DATABASE pipdrive;
CREATE ROLE pipdrive LOGIN;
ALTER ROLE pipdrive WITH PASSWORD pipdrive;
GRANT ALL PRIVILEGES ON DATABASE pipdrive to pipdrive;