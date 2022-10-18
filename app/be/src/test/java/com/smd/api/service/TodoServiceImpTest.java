package com.smd.api.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

public class TodoServiceImpTest {
	@Test
	public void testCollectionSize() {
		List<String> catNames = Arrays.asList("Phibi", "Monica","kkkk");

		Assertions.assertThat(catNames).hasSize(2);
	}
}
