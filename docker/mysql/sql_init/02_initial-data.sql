-- INSERT INTO

--     final_deadline,

--     todo,

--     todo_schema.todo (final_deadline, todo)

-- VALUES ('2023/10/12', 'todo1',), ('2024/05/12', 'todo2',), ('2023/04/12', 'todo3',);

INSERT INTO
    `todo`(
        `id`,
        `production_date`,
        `final_deadline`,
        `todo`,
        `is_done`,
        `priority`
    )
VALUES (
        '1',
        '2022/12/20',
        '2024/12/12',
        'aaaaa',
        'false',
        '1'
    ), (
        '2',
        '2022/12/22',
        '2024/12/14',
        'iiiii',
        'true',
        '2'
    );