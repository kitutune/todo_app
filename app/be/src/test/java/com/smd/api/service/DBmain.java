package com.smd.api.service;

// import static org.junit.Assert.*;

import java.io.File;

import org.dbunit.Assertion;
import org.dbunit.IDatabaseTester;
import org.dbunit.JdbcDatabaseTester;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.ITable;
import org.dbunit.dataset.filter.DefaultColumnFilter;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.dbunit.operation.DatabaseOperation;
import org.junit.jupiter.api.*;
// import org.junit.After;
// import org.junit.Before;
// import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * [テストクラス]<br>
 * JUnitとDBUnitを使用してテストを行う。<br>
 * <br>
 */
public class DBmain {
    /** ロガー */
    private Logger logger = LoggerFactory.getLogger(DBmain.class);

    /** DBUnitのテスター */
    private static IDatabaseTester databaseTester;

    /**
     * [前処理]<br>
     * DBに事前データを準備する。<br>
     * <br>
     * 
     * @throws java.lang.Exception
     */
    @BeforeAll
    public void setUp() throws Exception {
        logger.info("前処理開始");

        // --------------------------------------
        // 事前準備データのINSERT
        // --------------------------------------
        // 事前準備データのINSERTにはスキーマも合わせて指定する
        databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver",
                "jdbc:mysql://mysql/todo_schema", "dev_usr",
                "dev_usr_pass");

        // --------------------------------------
        // テストデータ投入
        // --------------------------------------
        String inputFile = getClass().getResource("TodoServiceImpTestResource/input.xml").toString();
        System.out.println(inputFile);
        IDataSet dataSet = new FlatXmlDataSetBuilder()
                // .build(new File("src/test/java/com/example/DBUnitDemo/data/Before.xml"));
                .build(new File(inputFile));
        databaseTester.setDataSet(dataSet);
        // DELETE→INSERTで事前準備データを用意する
        databaseTester.setSetUpOperation(DatabaseOperation.CLEAN_INSERT);
        databaseTester.onSetup();

        logger.info("前処理終了");
    }

    /**
     * [後処理]<br>
     * テスト後の後処理を行う。<br>
     * DBUnitの後片付けを行う。<br>
     * <br>
     * 
     * @throws java.lang.Exception
     */
    @AfterAll
    public void tearDown() throws Exception {
        databaseTester.setTearDownOperation(DatabaseOperation.NONE);
        databaseTester.onTearDown();
    }

    /**
     * [テスト]<br>
     * DBUnitを使用して、DBの更新結果を検証する。<br>
     */
    // @Test
    // public void test() {
    // logger.info("JUnit + DBUnitによるテスト開始。");

    // TestMain.main(null);

    // try {
    // // ----------------------------------
    // // DBUnitで更新後データチェック
    // // ----------------------------------
    // IDataSet expectedDataSet = new FlatXmlDataSetBuilder()
    // .build(new File("src/test/java/com/example/DBUnitDemo/data/After.xml"));
    // ITable expectedTable = expectedDataSet.getTable("user");

    // IDataSet databaseDataSet = databaseTester.getConnection().createDataSet();
    // ITable actualTable = databaseDataSet.getTable("user");

    // // 時間に対するAssertionはほぼ確実に失敗するので検証対象から除外する
    // ITable filteredExpectedTable = DefaultColumnFilter.excludedColumnsTable(
    // expectedTable, new String[] { "HIREDATE" });
    // ITable filteredActualTable;
    // filteredActualTable = DefaultColumnFilter.excludedColumnsTable(
    // actualTable, new String[] { "HIREDATE" });

    // // ---------------------------------------------------------------
    // // 更新結果の検証はJUnitではなくDBUnitのAssertionを使用する
    // // ---------------------------------------------------------------
    // Assertion.assertEquals(filteredExpectedTable, filteredActualTable);
    // } catch (Exception e) {
    // logger.error("エラー", e);
    // fail("予期しないエラーでテストが失敗しました。");
    // }

    // logger.info("JUnit + DBUnitによるテスト開始。");
    // }

    @Test
    public void test1() {
        System.out.println("aa");
    }
}