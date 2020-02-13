package com.springboot.proyectofct.app.exception;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

	private String INCORRECT_REQUEST = "INCORRECT_REQUEST";
    
	@ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleExceptionDefault
                        (Exception ex,  WebRequest request) {
		System.out.println("Exception");
        List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
        ErrorResponse error = new ErrorResponse(INCORRECT_REQUEST, details);
        
        try {
			writeFile(HttpStatus.INTERNAL_SERVER_ERROR, ex);
		} catch (IOException e) {
			//e.printStackTrace();
		}
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
	/*
	 * writeFile() Método que lee el archivo, copia el contenido, a este se le
	 * concatenan al principio los datos de la excepción lanzada y sobreescribe todo
	 * esto en el mismo archivo de log
	 */

	public void writeFile(HttpStatus status, Exception e) throws IOException {

		String nameFile = "logs\\logerror.txt";
		String result = "";
		String line = "";
		String error = "";
		StringWriter writer = new StringWriter();
		PrintWriter printWriter = new PrintWriter(writer);
		e.printStackTrace(printWriter);

		File file = new File(nameFile);
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
		
		while ((line = br.readLine()) != null) {
			result = result + line + "\n";
		}

		error =  LocalDateTime.now().toString()+ " - Status - " + status + "\n" + writer.toString() + "\n";

		result = error + result;

		br.close();
		file.delete();
		FileOutputStream fos = new FileOutputStream(file);
		fos.write(result.getBytes());
		fos.flush();
		fos.close();

	}
}
