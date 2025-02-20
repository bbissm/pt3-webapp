package ch.bfh.ti.academia.service;

import ch.bfh.ti.academia.dto.ModuleDto;
import ch.bfh.ti.academia.entity.Module;
import ch.bfh.ti.academia.util.DBUtil;
import ch.bfh.ti.academia.util.LogUtil;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ModuleServiceIT {

	private static final ModuleService service = new ModuleService();

	@BeforeAll
	public static void setup() {
		LogUtil.configure();
		DBUtil.runScript("db-create.sql");
		DBUtil.runScript("db-init.sql");
	}

	@Test
	public void findAllModules() {
		List<ModuleDto> modules = service.getModules();
		assertTrue(modules.contains(new ModuleDto("M1", "Name1")));
	}

	@Test
	public void findModule() throws ModuleNotFoundException {
		Module foundModule = service.findModule("M1");
		assertEquals("M1", foundModule.getNr());
		assertThrows(ModuleNotFoundException.class, () -> service.findModule("Mx"));
	}

	@Test
	public void persistModule() throws ModuleAlreadyExistsException {
		Module module = new Module("M0", "Name0", "Description0");
		service.addModule(module);
		assertThrows(ModuleAlreadyExistsException.class, () -> service.addModule(module));
	}

	@Test
	public void updateModule() throws ModuleNotFoundException {
		Module module = service.findModule("M2");
		module.setName("NewName2");
		service.updateModule(module);
		Module updatedModule = service.findModule("M2");
		assertEquals(module.getName(), updatedModule.getName());
	}

	@Test
	public void deleteModule() throws ModuleNotFoundException {
		service.deleteModule("M3");
		assertThrows(ModuleNotFoundException.class, () -> service.deleteModule("M3"));
	}
}
