package ch.bfh.ti.academia.util;

import org.h2.tools.RunScript;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Logger;

public class DBUtil {

	private static final Logger logger = Logger.getLogger(DBUtil.class.getName());

	public static ResultSet runScript(String name) {
		logger.info("Execute script " + name);
		Connection connection = ConnectionManager.getInstance().getConnection(true);
		try {
			InputStream inputStream = DBUtil.class.getResourceAsStream("/" + name);
			InputStreamReader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
			return RunScript.execute(connection, reader);
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		} finally {
			ConnectionManager.getInstance().close(connection);
		}
	}
}
