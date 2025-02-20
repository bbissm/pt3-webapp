package ch.bfh.ti.academia.service;

import ch.bfh.ti.academia.dto.ModuleDto;
import ch.bfh.ti.academia.entity.Module;
import ch.bfh.ti.academia.repository.ModuleRepository;
import ch.bfh.ti.academia.util.ConnectionManager;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

/**
 * The class ModuleService provides service methods for the administration of modules.
 */
public class ModuleService {

	private static final ConnectionManager connectionManager = ConnectionManager.getInstance();
	private static final Logger logger = Logger.getLogger(ModuleService.class.getName());

	public List<ModuleDto> getModules() {
		logger.info("Get modules");
		Connection connection = connectionManager.getConnection(true);
		try {
			ModuleRepository repository = new ModuleRepository(connection);
			return repository.findAll();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		} finally {
			connectionManager.close(connection);
		}
	}

	public Module findModule(String nr) throws ModuleNotFoundException {
		logger.info("Find module " + nr);
		Connection connection = connectionManager.getConnection(true);
		try {
			ModuleRepository repository = new ModuleRepository(connection);
			Module module = repository.find(nr);
			if (module == null) throw new ModuleNotFoundException();
			return module;
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		} finally {
			connectionManager.close(connection);
		}
	}

	public Module addModule(Module module) throws ModuleAlreadyExistsException {
		logger.info("Add module " + module.getNr());
		Connection connection = connectionManager.getConnection(false);
		try {
			ModuleRepository repository = new ModuleRepository(connection);
			if (repository.find(module.getNr()) != null) throw new ModuleAlreadyExistsException();
			repository.persist(module);
			connectionManager.commit(connection);
			return module;
		} catch (SQLException ex) {
			connectionManager.rollback(connection);
			throw new RuntimeException(ex);
		} finally {
			connectionManager.close(connection);
		}
	}

	public Module updateModule(Module module) throws ModuleNotFoundException {
		logger.info("Update module " + module.getNr());
		Connection connection = connectionManager.getConnection(false);
		try {
			ModuleRepository repository = new ModuleRepository(connection);
			if (repository.find(module.getNr()) == null) throw new ModuleNotFoundException();
			repository.update(module);
			connectionManager.commit(connection);
			return module;
		} catch (SQLException ex) {
			connectionManager.rollback(connection);
			throw new RuntimeException(ex);
		} finally {
			connectionManager.close(connection);
		}
	}

	public void deleteModule(String nr) throws ModuleNotFoundException {
		logger.info("Delete module " + nr);
		Connection connection = connectionManager.getConnection(false);
		try {
			ModuleRepository repository = new ModuleRepository(connection);
			if (repository.find(nr) == null) throw new ModuleNotFoundException();
			repository.delete(nr);
			connectionManager.commit(connection);
		} catch (SQLException ex) {
			connectionManager.rollback(connection);
			throw new RuntimeException(ex);
		} finally {
			connectionManager.close(connection);
		}
	}
}
