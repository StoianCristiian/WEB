CREATE TABLE Users(
    user_id NUMBER PRIMARY KEY,
username VARCHAR2(50) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
created_at DATE DEFAULT SYSDATE NOT NULL,
updated_at DATE DEFAULT SYSDATE NOT NULL,
rol VARCHAR2(20) DEFAULT 'user' NOT NULL
);
CREATE TABLE Input_Types (
    input_type_id NUMBER PRIMARY KEY,
    name VARCHAR2(50) UNIQUE NOT NULL,
    description VARCHAR2(255)
);

CREATE TABLE Generated_Inputs (
    input_id NUMBER PRIMARY KEY,
    user_id NUMBER NOT NULL,
    input_type_id NUMBER NOT NULL,
    generated_content VARCHAR(4000) NOT NULL,
    created_at DATE DEFAULT SYSDATE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT fk_type FOREIGN KEY (input_type_id) REFERENCES Input_Types(input_type_id)
);


CREATE TABLE Input_Parameters (
    param_id NUMBER PRIMARY KEY,
    input_id NUMBER NOT NULL,
    param_name VARCHAR2(50) NOT NULL,
    param_value VARCHAR2(100) NOT NULL,
    CONSTRAINT fk_input FOREIGN KEY (input_id) REFERENCES Generated_Inputs(input_id)
);

CREATE SEQUENCE seq_user_id START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trg_user_id 
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
   IF :NEW.user_id IS NULL THEN
        SELECT seq_user_id.NEXTVAL INTO :NEW.user_id FROM dual;
     END IF;
END ;
/

CREATE SEQUENCE seq_input_type_id START WITH 1 INCREMENT BY 1;
CREATE OR REPLACE TRIGGER trg_input_type_id
BEFORE INSERT ON Input_Types
FOR EACH ROW
BEGIN
   IF :NEW.input_type_id IS NULL THEN
        SELECT seq_input_type_id.NEXTVAL INTO :NEW.input_type_id FROM dual;
     END IF;
END ;
/

SELECT * FROM Input_Types;

CREATE SEQUENCE seq_input_id START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trg_input_id
BEFORE INSERT ON Generated_Inputs
FOR EACH ROW
BEGIN
   IF :NEW.input_id IS NULL THEN
        SELECT seq_input_id.NEXTVAL INTO :NEW.input_id FROM dual;
     END IF;
END ;
/

CREATE SEQUENCE seq_param_id START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trg_param_id
BEFORE INSERT ON Input_Parameters
FOR EACH ROW
BEGIN
    IF :new.param_id IS NULL THEN
        SELECT seq_param_id.NEXTVAL INTO :new.param_id FROM dual;
    END IF;
END;
/
INSERT INTO Input_Types (name, description) VALUES ('vector', 'Vector numeric generat automat');
INSERT INTO Input_Types (name, description) VALUES ('matrice', 'Matrice numerică generată automat');
INSERT INTO Input_Types (name, description) VALUES ('graf', 'Graf orientat sau neorientat generat automat');
INSERT INTO Input_Types (name, description) VALUES ('sir', 'Șir de caractere generat automat');
INSERT INTO Input_Types (name, description) VALUES ('arbore', 'Arbore binar sau AVL generat automat');
Select * from Input_Types order by input_type_id;