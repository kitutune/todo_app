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

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

public class TodoServiceImpTest {
	static IDatabaseTester databaseTester;
	static IDatabaseConnection connection;

	// 現在のクラス内にある全テストが実行される前の処理
	@BeforeAll
	static void beforeAll() throws Exception {
		// /app/src/main/resources/application.propertiesに記述している内容
		// databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver",
		// "jdbc:mysql://mysql/todo_schema");
		databaseTester = new JdbcDatabaseTester("com.mysql.cj.jdbc.Driver", "jdbc:mysql://mysql/todo_schema", "dev_usr",
				"dev_usr_pass");
		connection = databaseTester.getConnection();
	}

	// 現在のクラス内にある各テストが実行される前の処理
	@BeforeEach
	void beforeEach() throws Exception {
		// XmlDataSet setUpDataSet =
		// readXmlDataSet("com/smd/api/service/TodoServiceImpTestResource/input.xml");
		XmlDataSet setUpDataSet = readXmlDataSet(
				"/app/src/test/resources/com/smd/api/service/TodoServiceImpTestResource/input.xml");
		databaseTester.setDataSet(setUpDataSet);

		databaseTester.onSetup();
	}

	private XmlDataSet readXmlDataSet(String path) throws Exception {
		try (InputStream inputStream = getClass().getResourceAsStream(path)) {
			return new XmlDataSet(inputStream);
		}
	}

	@Test
	void test() throws Exception {
		XmlDataSet expected = readXmlDataSet("com/smd/api/service/TodoServiceImpTestResource/expected.xml");
		IDataSet actual = connection.createDataSet();

		// assertEquals(expected, actual);
		Assertions.assertThat(actual).isEqualTo(expected);
	}

	// 現在のクラス内にある全テストが実行された後の処理
	@AfterAll
	static void afterAll() throws Exception {
		if (connection != null) {
			connection.close();
		}
	}

	// @Test
	// public void testCollectionSize() {
	// List<String> catNames = Arrays.asList("Phibi", "Monica", "kkkk");

	// Assertions.assertThat(catNames).hasSize(3);
	// }

}
