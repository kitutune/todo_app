package com.smd.api.service;

// import java.net.URL;

import org.assertj.core.api.Assertions;
import org.dbunit.IDatabaseTester;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.JdbcDatabaseTester;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.XmlDataSet;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
// import org.springframework.core.io.ClassPathResource;
// import org.w3c.dom.Document;

import java.io.InputStream;
// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.util.Arrays;
// import java.util.List;

// import javax.xml.parsers.DocumentBuilder;
// import javax.xml.parsers.DocumentBuilderFactory;

public class TodoServiceImpTest {
	static IDatabaseTester databaseTester;
	static IDatabaseConnection connection;

	// 現在のクラス内にある全テストが実行される前の処理
	@BeforeAll
	static void beforeAll() throws Exception {
	// /app/src/main/resources/application.propertiesに記述している内容
	// databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver",
	// "jdbc:mysql://mysql/todo_schema");
	databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver",
	"jdbc:mysql://mysql/todo_schema", "dev_usr",
	"dev_usr_pass");
	connection = databaseTester.getConnection();
	}

	// 現在のクラス内にある各テストが実行される前の処理
	@BeforeEach
	void beforeEach() throws Exception {
	// XmlDataSet setUpDataSet =
	//
	// readXmlDataSet("com/smd/api/service/TodoServiceImpTestResource/input.xml");
	String inputFile =  TodoServiceImpTest.class.getResource("TodoServiceImpTestResource/input.xml").toString();
	System.out.println(inputFile);
	// TodoServiceImpTest.class.getClassLoader().getResource("input.xml").getPath();
	// XmlDataSet setUpDataSet = readXmlDataSet(
	// "/app/src/test/resources/com/smd/api/service/TodoServiceImpTestResource/input.xml");
	// XmlDataSet setUpDataSet = readXmlDataSet(inputFile);
	XmlDataSet setUpDataSet = readXmlDataSet("TodoServiceImpTestResource/input.xml");
	databaseTester.setDataSet(setUpDataSet);
	databaseTester.onSetup();
	}

	// 現在のクラス内にある全テストが実行された後の処理
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

	@Test
	void test() throws Exception {
	String inputFile =  TodoServiceImpTest.class.getResource("TodoServiceImpTestResource/expected.xml").toString();
	System.out.println(inputFile);
	// TodoServiceImpTest.class.getClassLoader().getResource("expected.xml").getPath();
	// XmlDataSet expected =
	//
	// readXmlDataSet("com/smd/api/service/TodoServiceImpTestResource/expected.xml");
	// XmlDataSet expected = readXmlDataSet(inputFile);
	XmlDataSet expected = readXmlDataSet("TodoServiceImpTestResource/expected.xml");
	IDataSet actual = connection.createDataSet();

	// assertEquals(expected, actual);
	Assertions.assertThat(actual).isEqualTo(expected);
	}


	// @Test
	// public void testCollectionSize() {
	// List<String> catNames = Arrays.asList("Phibi", "Monica", "kkkk");

	// Assertions.assertThat(catNames).hasSize(3);
	// }

	// - クラスローダから test.xml のファイル位置を取得
	// - クラスローダに指定するクラスは何でも良いが、自クラスを指定すると良さそう
	@Test
	public void test1() {

		// URL fileName = TodoServiceImpTest.class.getResource("input.xml");
		// URL fileName = TodoServiceImpTest.class.getResource("TodoServiceImpTestResource/expected.xml");
		String fileName = TodoServiceImpTest.class.getResource("TodoServiceImpTestResource/expected.xml").toString();
		System.out.println(fileName);
	}


}
