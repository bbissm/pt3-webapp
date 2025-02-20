package ch.bfh.ti.academia.repository;

import ch.bfh.ti.academia.dto.ModuleDto;
import ch.bfh.ti.academia.entity.Module;
import ch.bfh.ti.academia.util.ConnectionManager;
import ch.bfh.ti.academia.util.DBUtil;
import ch.bfh.ti.academia.util.LogUtil;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ModuleRepositoryIT {

	private static Connection connection;
	private static ModuleRepository repository;

	@BeforeAll
	public static void setup() {
		LogUtil.configure();
		DBUtil.runScript("db-create.sql");
		DBUtil.runScript("db-init.sql");
		connection = ConnectionManager.getInstance().getConnection(true);
		repository = new ModuleRepository(connection);
	}

	@AfterAll
	public static void cleanup() {
		ConnectionManager.getInstance().close(connection);
	}

	@Test
	public void findAllModules() throws SQLException {
		List<ModuleDto> modules = repository.findAll();
		assertTrue(modules.contains(new ModuleDto("M1", "Name1")));
	}

	@Test
	public void findModule() throws SQLException {
		Module foundModule = repository.find("M1");
		assertEquals("M1", foundModule.getNr());
		assertNull(repository.find("Mx"));
	}

	@Test
	public void persistModule() throws SQLException {
		Module module = new Module("M0", "Name0", "Description0");
		repository.persist(module);
		assertThrows(SQLException.class, () -> repository.persist(module));
	}

	@Test
	public void updateModule() throws SQLException {
		Module module = repository.find("M2");
		module.setName("NewName2");
		repository.update(module);
		Module updatedModule = repository.find("M2");
		assertEquals(module.getName(), updatedModule.getName());
	}

	@Test
	public void deleteModule() throws SQLException {
		repository.delete("M3");
		assertFalse(repository.delete("M3"));
	}
}
