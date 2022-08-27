CREATE DATABASE
    IF NOT EXISTS todo_schema CHARACTER SET utf8 COLLATE utf8_general_ci;

USE todo_schema;

CREATE TABLE
    IF NOT EXISTS todo_schema.todo(
        -- ユニーク
        id int PRIMARY KEY AUTO_INCREMENT,
        -- todoの作成日（編集時に更新するかはまだ未定）
        production_date datetime DEFAULT CURRENT_TIMESTAMP,
        -- todoの最終期限
        final_deadline datetime,
        -- やること
        todo varchar(200) NOT NULL,
        -- 作業済み
        is_done varchar(5) DEFAULT "false",
        -- 重要度
        priority varchar(1) DEFAULT 0,
        INDEX(id)
    );