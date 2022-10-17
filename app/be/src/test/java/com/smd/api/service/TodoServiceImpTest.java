package com.smd.api.service;

import org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Arrays;
// import static org.hamcrest.MatcherAssert.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

import com.smd.api.entity.TodoEntity;
import com.smd.api.form.TodoForm;
import com.smd.api.repository.TodoRepository;

// class TodoServiceImpTest {}

//	@AfterAll
//	static void tearDownAfterClass() throws Exception {
//	}
// テスト対象

public class TodoServiceImpTest {
	@Test
	public void testCollectionSize() {
		List<String> catNames = Arrays.asList("Phibi", "Monica");

		assertThat(catNames, hasSize(2));
	}
}
