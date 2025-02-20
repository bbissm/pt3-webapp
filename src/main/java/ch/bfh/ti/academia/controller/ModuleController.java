package ch.bfh.ti.academia.controller;

import ch.bfh.ti.academia.dto.ModuleDto;
import ch.bfh.ti.academia.entity.Module;
import ch.bfh.ti.academia.service.ModuleAlreadyExistsException;
import ch.bfh.ti.academia.service.ModuleNotFoundException;
import ch.bfh.ti.academia.service.ModuleService;
import ch.bfh.ti.academia.util.ObjectMapperFactory;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static jakarta.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static jakarta.servlet.http.HttpServletResponse.SC_CONFLICT;
import static jakarta.servlet.http.HttpServletResponse.SC_CREATED;
import static jakarta.servlet.http.HttpServletResponse.SC_NOT_FOUND;
import static jakarta.servlet.http.HttpServletResponse.SC_NO_CONTENT;
import static jakarta.servlet.http.HttpServletResponse.SC_OK;

/**
 * The class ModulesServlet provides REST endpoints for the administration of modules.
 */
@WebServlet("/api/modules/*")
public class ModuleController extends HttpServlet {

	private static final String CONTENT_TYPE_HEADER = "Content-Type";
	private static final String JSON_MEDIA_TYPE = "application/json";

	private final ModuleService moduleService = new ModuleService();
	private final ObjectMapper objectMapper = ObjectMapperFactory.createObjectMapper();

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			if (request.getPathInfo() == null || request.getPathInfo().equals("/")) {
				// get modules
				List<ModuleDto> modules = moduleService.getModules();
				response.setStatus(SC_OK);
				response.setHeader(CONTENT_TYPE_HEADER, JSON_MEDIA_TYPE);
				objectMapper.writeValue(response.getOutputStream(), modules);
			} else {
				// find module
				String nr = request.getPathInfo().substring(1);
				Module module = moduleService.findModule(nr);
				response.setStatus(SC_OK);
				response.setHeader(CONTENT_TYPE_HEADER, JSON_MEDIA_TYPE);
				objectMapper.writeValue(response.getOutputStream(), module);
			}
		} catch (ModuleNotFoundException ex) {
			response.setStatus(SC_NOT_FOUND);
		}
	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			// check request path
			String pathInfo = request.getPathInfo();
			if (pathInfo != null && !pathInfo.equals("/")) {
				response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
				return;
			}
			// parse and validate module
			Module module = objectMapper.readValue(request.getInputStream(), Module.class);
			if (module.getNr() == null || module.getNr().isEmpty()
					|| module.getName() == null || module.getName().isEmpty()) {
				response.sendError(SC_BAD_REQUEST);
				return;
			}
			// add module
			module = moduleService.addModule(module);
			response.setStatus(SC_CREATED);
			response.setHeader(CONTENT_TYPE_HEADER, JSON_MEDIA_TYPE);
			objectMapper.writeValue(response.getOutputStream(), module);
		} catch (ModuleAlreadyExistsException ex) {
			response.setStatus(SC_CONFLICT);
		}
	}

	@Override
	public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			// check request path
			String pathInfo = request.getPathInfo();
			if (pathInfo == null || pathInfo.equals("/")) {
				response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
				return;
			}
			// parse and validate module
			String nr = pathInfo.substring(1);
			Module module = objectMapper.readValue(request.getInputStream(), Module.class);
			if (module.getNr() == null || !module.getNr().equals(nr)
					|| module.getName() == null || module.getName().isEmpty()) {
				response.sendError(SC_BAD_REQUEST);
				return;
			}
			// update module
			module = moduleService.updateModule(module);
			response.setStatus(SC_OK);
			response.setHeader(CONTENT_TYPE_HEADER, JSON_MEDIA_TYPE);
			objectMapper.writeValue(response.getOutputStream(), module);
		} catch (JsonParseException ex) {
			response.sendError(SC_BAD_REQUEST);
		} catch (ModuleNotFoundException ex) {
			response.setStatus(SC_NOT_FOUND);
		}
	}

	@Override
	public void doDelete(HttpServletRequest request, HttpServletResponse response) {
		try {
			// check request path
			String pathInfo = request.getPathInfo();
			if (pathInfo == null || pathInfo.equals("/")) {
				response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
				return;
			}
			// delete module
			String nr = pathInfo.substring(1);
			moduleService.deleteModule(nr);
			response.setStatus(SC_NO_CONTENT);
		} catch (ModuleNotFoundException ex) {
			response.setStatus(SC_NOT_FOUND);
		}
	}
}
