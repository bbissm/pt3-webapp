package ch.bfh.ti.academia.controller;

import ch.bfh.ti.academia.dto.ModuleDto;
import ch.bfh.ti.academia.entity.Module;
import ch.bfh.ti.academia.util.DBUtil;
import ch.bfh.ti.academia.util.LogUtil;
import ch.bfh.ti.academia.util.ServerUtil;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ModuleControllerIT {

	private static final String USERNAME = "admin";
	private static final String PASSWORD = "admin";

	@BeforeAll
	public static void setup() throws Exception {
		RestAssured.port = 9090;
		LogUtil.configure();
		DBUtil.runScript("db-create.sql");
		DBUtil.runScript("db-init.sql");
		ServerUtil.start();
	}

	@AfterAll
	public static void cleanup() throws Exception {
		ServerUtil.stop();
	}

	@Test
	public void addModule() {
		Module module = new Module("M0", "Name0", "Description0");
		RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD)
				.contentType(ContentType.JSON).accept(ContentType.JSON).body(module)
				.when().post("/api/modules")
				.then().statusCode(201);
		RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD)
				.contentType(ContentType.JSON).accept(ContentType.JSON).body(module)
				.when().post("/api/modules")
				.then().statusCode(409);
	}

	@Test
	public void getModule() {
		Module foundModule = RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD).accept(ContentType.JSON)
				.when().get("/api/modules/M1")
				.then().statusCode(200).extract().as(Module.class);
		assertEquals("M1", foundModule.getNr());
		RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD).accept(ContentType.JSON)
				.when().get("/api/modules/Mx")
				.then().statusCode(404);
	}

	@Test
	public void getModules() {
		ModuleDto module = new ModuleDto("M1", "Name1");
		ModuleDto[] modules = RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD).accept(ContentType.JSON)
				.when().get("/api/modules")
				.then().statusCode(200).extract().as(ModuleDto[].class);
		assertTrue(Arrays.asList(modules).contains(module));
	}

	@Test
	public void updateModule() {
		Module module = RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD).accept(ContentType.JSON)
				.when().get("/api/modules/M2")
				.then().statusCode(200).extract().as(Module.class);
		module.setName("NewName2");
		RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD)
				.contentType(ContentType.JSON).accept(ContentType.JSON).body(module)
				.when().put("/api/modules/M2")
				.then().statusCode(200);
		Module updatedModule = RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD).accept(ContentType.JSON)
				.when().get("/api/modules/M2")
				.then().statusCode(200).extract().as(Module.class);
		assertEquals(module.getName(), updatedModule.getName());
	}

	@Test
	public void removeModule() {
		RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD)
				.when().delete("/api/modules/M3")
				.then().statusCode(204);
		RestAssured
				.given().auth().preemptive().basic(USERNAME, PASSWORD)
				.when().delete("/api/modules/M3")
				.then().statusCode(404);
	}
}
