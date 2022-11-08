package com.smd.api.service;

import java.sql.*;
// import java.sql.DriverManager;
// import java.sql.PreparedStatement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DB {

    // DBからデータを取得する
    /** ロガー */
    private static Logger logger = LoggerFactory.getLogger(DBtest.class);

    // /** 実行するSQL */
    // private static final String SQL = " update user set name = 'abc' where id =
    // 1";

    /**
     * @param args
     */
    public static void main(String[] args) {
        logger.info("処理開始");

        // ---------------------------------
        // DBを更新する
        // ---------------------------------
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://mysql/todo_schema", "dev_usr", "dev_usr_pass");
            // PreparedStatement stmt = conn.prepareStatement(SQL);

            // トランザクションを毎回コミットしない
            conn.setAutoCommit(false);
            // int i = stmt.executeUpdate();

            Statement stmt = conn.createStatement();

            ResultSet result = stmt.executeQuery("SELECT * FROM todo");
            // var result = stmt.executeQuery("SELECT * FROM todo");
            // // 処理件数を表示する
            // logger.info("処理件数:[" + i + "]");

            
            while (result.next()) {

                System.out.println(result.getInt(1) + "\t" + result.getString(2));
            }
            

            System.out.println(conn.toString());

            // // ここでトランザクションをコミットする
            // conn.commit();

            // 結果セットをクローズ
            result.close();
            // ステートメントをクローズ
            stmt.close();
            // 接続をクローズ
            conn.close();
        } catch (Exception e) {
            logger.error("エラー", e);
        }

        logger.info("処理終了");
    }
}
