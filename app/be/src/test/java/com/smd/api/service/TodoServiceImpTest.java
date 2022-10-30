package com.smd.api.service;

import org.assertj.core.api.Assertions;
import org.dbunit.IDatabaseTester;
import org.dbunit.JdbcDatabaseTester;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.XmlDataSet;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.w3c.dom.Document;

import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class TodoServiceImpTest {
	static IDatabaseTester databaseTester;
	static IDatabaseConnection connection;

	// // 現在のクラス内にある全テストが実行される前の処理
	// @BeforeAll
	// static void beforeAll() throws Exception {
	// // /app/src/main/resources/application.propertiesに記述している内容
	// // databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver",
	// // "jdbc:mysql://mysql/todo_schema");
	// databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver",
	// "jdbc:mysql://mysql/todo_schema", "dev_usr",
	// "dev_usr_pass");
	// connection = databaseTester.getConnection();
	// }

	// // 現在のクラス内にある各テストが実行される前の処理
	// @BeforeEach
	// void beforeEach() throws Exception {
	// // XmlDataSet setUpDataSet =
	// //
	// readXmlDataSet("com/smd/api/service/TodoServiceImpTestResource/input.xml");
	// String inputFile =
	// TodoServiceImpTest.class.getClassLoader().getResource("input.xml").getPath();
	// // XmlDataSet setUpDataSet = readXmlDataSet(
	// //
	// "/app/src/test/resources/com/smd/api/service/TodoServiceImpTestResource/input.xml");
	// XmlDataSet setUpDataSet = readXmlDataSet(inputFile);
	// databaseTester.setDataSet(setUpDataSet);
	// databaseTester.onSetup();
	// }

	// private XmlDataSet readXmlDataSet(String path) throws Exception {
	// try (InputStream inputStream = getClass().getResourceAsStream(path)) {
	// return new XmlDataSet(inputStream);
	// }
	// }

	// @Test
	// void test() throws Exception {
	// String inputFile =
	// TodoServiceImpTest.class.getClassLoader().getResource("expected.xml").getPath();
	// // XmlDataSet expected =
	// //
	// readXmlDataSet("com/smd/api/service/TodoServiceImpTestResource/expected.xml");
	// XmlDataSet expected = readXmlDataSet(inputFile);
	// IDataSet actual = connection.createDataSet();

	// // assertEquals(expected, actual);
	// Assertions.assertThat(actual).isEqualTo(expected);
	// }

	// // 現在のクラス内にある全テストが実行された後の処理
	// @AfterAll
	// static void afterAll() throws Exception {
	// if (connection != null) {
	// connection.close();
	// }
	// }

	// @Test
	// public void testCollectionSize() {
	// List<String> catNames = Arrays.asList("Phibi", "Monica", "kkkk");

	// Assertions.assertThat(catNames).hasSize(3);
	// }

	// - クラスローダから test.xml のファイル位置を取得
	// - クラスローダに指定するクラスは何でも良いが、自クラスを指定すると良さそう
	@Test
	public void test1() {

		// String fileName =
		// TodoServiceImpTest.class.getClassLoader().getResource("input.xml").getPath();
		String fileName = TodoServiceImpTest.class.getClassLoader().getResource("input.xml").toString();
		System.out.println(fileName);
	}

	// @Test
	// public void test2() {
	// try {

	// // 1. DocumentBuilderFactoryのインスタンスを取得する
	// DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	// // 2. DocumentBuilderのインスタンスを取得する
	// DocumentBuilder builder = factory.newDocumentBuilder();
	// // 3. DocumentBuilderにXMLを読み込ませ、Documentを作る
	// Document document = builder.parse(
	// // ここでエラーに遷移している
	// Paths.get("/app/src/test/resources/com/smd/api/service/TodoServiceImpTestResource/expected.xml")
	// .toFile());
	// System.out.println(document.getBaseURI());
	// } catch (Exception e) {
	// // TODO: handle exception
	// System.out.println("error");
	// }
	// }

	// @Test
	// public void test3() {
	// // 存在しなくてもパスを表示している
	// Path path = Paths.get("iput.xml");

	// //ファイルパスを取得する
	// String str = path.toAbsolutePath().toString();

	// System.out.println("pass : " + str);
	// }

}
