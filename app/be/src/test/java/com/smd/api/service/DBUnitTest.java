package com.smd.api.service;

import org.dbunit.IDatabaseTester;
import org.dbunit.JdbcDatabaseTester;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.ITable;
import org.dbunit.dataset.xml.XmlDataSet;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.InputStream;
// import java.sql.Connection;
// import java.sql.PreparedStatement;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

import static org.dbunit.Assertion.assertEquals;

public class DBUnittest {
    static IDatabaseTester databaseTester;
    static IDatabaseConnection connection;
    // /** ロガー */ いれてみたけど使っていない
    // private static Logger logger = LoggerFactory.getLogger(sample.class);

    @BeforeAll
    static void beforeAll() throws Exception {
        databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver",
                "jdbc:mysql://mysql/todo_schema", "dev_usr",
                "dev_usr_pass");
        // ここで実際にDBにアクセスしている？
        connection = databaseTester.getConnection();

        // DB初期化(テーブル作成)

    }

    @BeforeEach
    void beforeEach() throws Exception {
        // 参考
        // XmlDataSet setUpDataSet =
        // readXmlDataSet("/sandbox/dbunit/HelloDbUnitTest/test/setUp.xml");
        XmlDataSet setUpDataSet = readXmlDataSet("/com/smd/api/service/TodoServiceImpTestResource/input.xml");
        databaseTester.setDataSet(setUpDataSet);

        databaseTester.onSetup();
    }

    @Test
    void test() throws Exception {
        // URL inputFile =
        // TodoServiceImpTest.class.getResource("TodoServiceImpTestResource/expected.xml");
        XmlDataSet expected = readXmlDataSet("/com/smd/api/service/TodoServiceImpTestResource/expected.xml");
        IDataSet actual = connection.createDataSet();
        ITable actualTable = actual.getTable("todo");
        ITable expectedTable = expected.getTable("todo");
        /*
         * Column[] cols = actualTable.getTableMetaData().getColumns();
         * for (String tb : actual.getTableNames()) {
         * System.out.println("DBの実測値" + tb);
         * }
         * for (String tb : expected.getTableNames()) {
         * System.out.println("DBの期待値" + tb);
         * }
         * 
         * // System.out.println("DBの実測値" + actual.getTableNames());
         * // System.out.println("DBの期待値" + expected.getTableNames());
         * for (int row = 0; row < actualTable.getRowCount(); row++) {
         * 
         * for (Column col : cols) {
         * // System.out.println("1actualの中身は" + col.getColumnName());
         * // System.out.println("2actualの中身は" + col.getDefaultValue());
         * // System.out.println("3actualの中身は" + col.getRemarks());
         * // System.out.println("4actualの中身は" + col.getSqlTypeName());
         * System.out.println("DBの中身は" + actualTable.getValue(row,
         * col.getColumnName()));
         * 
         * }
         * }
         */
        // IDataSetを比べる
        // assertEquals(expected, actual);
        // ITable同士を比べる
        assertEquals(actualTable, expectedTable);
    }

    @AfterAll
    static void afterAll() throws Exception {
        if (connection != null) {
            connection.close();
        }
    }

    private XmlDataSet readXmlDataSet(String path) throws Exception {
        try (InputStream inputStream = getClass().getResourceAsStream(path)) {
            return new XmlDataSet(inputStream);
        }
    }

}
