package ch.bfh.ti.academia.repository;

import ch.bfh.ti.academia.dto.ModuleDto;
import ch.bfh.ti.academia.entity.Module;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * The class ModuleRepository provides persistence methods for modules.
 */
public class ModuleRepository {

	private static final String FIND_ALL_QUERY = "SELECT * FROM module";
	private static final String FIND_QUERY = "SELECT * FROM module WHERE nr=?";
	private static final String INSERT_QUERY = "INSERT INTO module (nr, name, description) VALUES (?, ?, ?)";
	private static final String UPDATE_QUERY = "UPDATE module SET name=?, description=? WHERE nr=?";
	private static final String DELETE_QUERY = "DELETE FROM module WHERE nr=?";

	private static final Logger logger = Logger.getLogger(ModuleRepository.class.getName());

	private final Connection connection;

	public ModuleRepository(Connection connection) {
		this.connection = connection;
	}

	public List<ModuleDto> findAll() throws SQLException {
		List<ModuleDto> modules = new ArrayList<>();
		try (PreparedStatement statement = connection.prepareStatement(FIND_ALL_QUERY)) {
			logger.fine("Execute query " + statement);
			ResultSet results = statement.executeQuery();
			while (results.next()) {
				modules.add(new ModuleDto(results.getString("nr"), results.getString("name")));
			}
			return modules;
		}
	}

	public Module find(String nr) throws SQLException {
		try (PreparedStatement statement = connection.prepareStatement(FIND_QUERY)) {
			statement.setString(1, nr);
			logger.fine("Execute query " + statement);
			ResultSet results = statement.executeQuery();
			if (results.next()) {
				return new Module(results.getString("nr"), results.getString("name"), results.getString("description"));
			} else return null;
		}
	}

	public void persist(Module module) throws SQLException {
		try (PreparedStatement statement = connection.prepareStatement(INSERT_QUERY)) {
			int index = 0;
			statement.setString(++index, module.getNr());
			statement.setString(++index, module.getName());
			statement.setString(++index, module.getDescription());
			logger.fine("Execute query " + statement);
			statement.executeUpdate();
		}
	}

	public boolean update(Module module) throws SQLException {
		try (PreparedStatement statement = connection.prepareStatement(UPDATE_QUERY)) {
			int index = 0;
			statement.setString(++index, module.getName());
			statement.setString(++index, module.getDescription());
			statement.setString(++index, module.getNr());
			logger.fine("Execute query " + statement);
			return statement.executeUpdate() > 0;
		}
	}

	public boolean delete(String nr) throws SQLException {
		try (PreparedStatement statement = connection.prepareStatement(DELETE_QUERY)) {
			statement.setString(1, nr);
			logger.fine("Execute query " + statement);
			return statement.executeUpdate() > 0;
		}
	}
}
