package com.smd.api.service;


import java.io.File;

import org.dbunit.Assertion;
import org.dbunit.IDatabaseTester;
import org.dbunit.JdbcDatabaseTester;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.ITable;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.dbunit.operation.DatabaseOperation;
import org.junit.jupiter.api.*;

public class DBUnitTest {
    // DBUnit用データベーステスター
    static IDatabaseTester databaseTester;
    // DBUnit用コネクション
    static IDatabaseConnection connection;

    public DBUnitTest() throws Exception {
        // テストクラスをインスタンス化するときに、DBに接続するためのtesterを作成する
        databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver",
                "jdbc:mysql://mysql/todo_schema", "dev_usr",
                "dev_usr_pass");
    }

    @BeforeAll
    static void before() throws Exception {
        // xmlのパス
        var inputFile = DBUnitTest.class.getResource("TodoServiceImpTestResource/input.xml");
        // テーブルに入れたいデータをxmlから取得
        IDataSet dataSet = new FlatXmlDataSetBuilder().build(new File(inputFile.getFile()));
        // データセットという位置？にxmlから取得したデータをセット
        databaseTester.setDataSet(dataSet);
        // データセットのデータと主キーが一致しているデータが存在しない場合はインサートされ、
        // 存在する場合はデータセットの内容に更新される。
        databaseTester.setSetUpOperation(DatabaseOperation.REFRESH);

        databaseTester.onSetup();
        ;
    }

    // @AfterAll
    // static void after() throws Exception {

    //     databaseTester.setTearDownOperation(DatabaseOperation.NONE);
    //     databaseTester.onTearDown();
    // }

    @Test
    public void compareTable() throws Exception {
        IDataSet databaseDataSet = databaseTester.getConnection().createDataSet();
        ITable actualTable = databaseDataSet.getTable("todo");

        // xmlのパス
        var inputFile = DBUnitTest.class.getResource("TodoServiceImpTestResource/expected.xml");
        IDataSet expectedDataSet = new FlatXmlDataSetBuilder().build(inputFile);
        ITable expectedTable = expectedDataSet.getTable("todo");

        Assertion.assertEquals(expectedTable, actualTable);
    }

}
