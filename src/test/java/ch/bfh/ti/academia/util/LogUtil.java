package ch.bfh.ti.academia.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.LogManager;

public class LogUtil {

	public static void configure() {
		try (InputStream config = ServerUtil.class.getResourceAsStream("/logging.properties")) {
			LogManager.getLogManager().readConfiguration(config);
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
	}
}
