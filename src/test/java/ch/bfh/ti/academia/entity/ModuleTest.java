package ch.bfh.ti.academia.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ModuleTest {

	@Test
	public void createModule() {
		Module module = new Module("M0", "Name0", "Description0");
		assertEquals("M0", module.getNr());
		assertEquals("Name0", module.getName());
		assertEquals("Description0", module.getDescription());
	}
}
