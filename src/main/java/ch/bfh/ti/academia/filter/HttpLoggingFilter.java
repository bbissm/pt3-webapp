package ch.bfh.ti.academia.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * The class LoggingFilter is used to log HTTP requests and their response status.
 */
@WebFilter(urlPatterns = "/api/*")
public class HttpLoggingFilter extends HttpFilter {

	private static final Logger logger = Logger.getLogger(HttpLoggingFilter.class.getName());

	@Override
	public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String message = request.getMethod() + " " + request.getRequestURI();
		if (request.getQueryString() != null) {
			message += "?" + request.getQueryString();
		}
		logger.fine("Receive request: " + message);
		chain.doFilter(request, response);
		logger.fine("Return response status: " + response.getStatus());
	}
}
