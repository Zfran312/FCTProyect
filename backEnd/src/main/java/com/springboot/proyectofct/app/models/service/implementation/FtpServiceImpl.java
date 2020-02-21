package com.springboot.proyectofct.app.models.service.implementation;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Random;

import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.springboot.proyectofct.app.models.service.IFtpService;

@Service
public class FtpServiceImpl implements IFtpService {

	FTPClient ftpConnection;

	private Logger logger = LoggerFactory.getLogger(IFtpService.class);

	final String RUTA_LOC = "C:\\\\FTP\\\\";
	final String RUTA_REM = "ftp:\\\\localhost\\\\";

	@Override
	public FTPClient connectToFtp(String host, String user, String pass) {
		// TODO Auto-generated method stub
		ftpConnection = new FTPClient();
		ftpConnection.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
		int reply;

		// Validamos la conexión al ftp
		try {
			ftpConnection.connect(host);
		} catch (IOException e) {
			logger.error("No fue posible conectarse al FTP a través del host=" + host);
		}

		// devuelve el posible error especifico por el que falla o nos indica si
		// el que esta todo ok

		reply = ftpConnection.getReplyCode();

		if (!FTPReply.isPositiveCompletion(reply)) {
			try {
				ftpConnection.disconnect();
			} catch (IOException e) {
				logger.error("No fue posible conectarse al FTP, el host=" + host + " entregó la respuesta=" + reply);
			}
		}

		// Valida por usuario y contraseña si tiene conexion al servidor ftp
		// al menos por ahora no nos afectar ya que entraremos con anonymous
		try {
			ftpConnection.login(user, pass);
		} catch (IOException e) {
			logger.error("El usuario=" + user + ", y el pass=**** no fueron válidos para la autenticación.");
		}

		// Establecemos el tipo de archivo esperado por el servidor.
		try {
			ftpConnection.setFileType(FTP.BINARY_FILE_TYPE);
		} catch (IOException e) {
			logger.error("El tipo de dato para la transferencia no es válido.");
		}

		// Tipo de conexión pasiva
		ftpConnection.enterLocalPassiveMode();

		return ftpConnection;
	}

	@Override
	public String uploadFileToFpt(FTPClient ftpClient, File fileLocate, String nameLocale) {
		// TODO Auto-generated method stub
		String dirname ="";
		FTPFile[] archivos;
		Boolean dirValid = true;
		try {
			Random r = new Random();
			
			archivos = ftpClient.listDirectories();
			do {
				dirValid = true;

				switch(nameLocale.split("\\.")[1].length()) {
				case 3:
					dirname = nameLocale.substring(0, nameLocale.length() - 4).toLowerCase() + (r.nextInt(9)+1);
					break;
				case 2:
					dirname = nameLocale.substring(0, nameLocale.length() - 3).toLowerCase() + (r.nextInt(9)+1);
				}
				

				for (int i = 0; i < archivos.length; i++) {
					if (archivos[i].getName().equals(dirname)) {
						dirValid = false;
					}
				}
			} while (!dirValid);

			dirname += "\\\\";

			if (dirValid) {
				ftpClient.makeDirectory(dirname);
				File firstLocalFile = new File(RUTA_LOC + fileLocate.getName());
				String firstRemoteFile = nameLocale;
				InputStream inputStream = new FileInputStream(firstLocalFile);
				System.out.println("Iniciando subida del archivo " + nameLocale);

				boolean done = ftpClient.storeFile(dirname + firstRemoteFile, inputStream);
				inputStream.close();
				if (done) {
					System.out.println("El archivo " + nameLocale + " se subio correctamente.");
					return RUTA_REM + dirname + firstRemoteFile;
				}
			} else {
				removeDirectory(ftpClient, dirname);
				uploadFileToFpt(ftpClient, fileLocate, nameLocale);
			}
		} catch (IOException e) {
			logger.error("No se pudo subir el archivo al servidor.");
			return "";
		}
		return "";
	}

	@Override
	public void disconnectFTP(FTPClient ftpClient) {
		// TODO Auto-generated method stub
		if (ftpClient.isConnected()) {
			try {
				ftpClient.logout();
				ftpClient.disconnect();
			} catch (IOException e) {
				logger.error("Ha ocurrido un error al realizar la desconexión del servidor FTP");
			}
		}
	}

	@Override
	public void removeDirectory(FTPClient ftpClient, String dirFtp) {
		// TODO Auto-generated method stub
		try {
			FTPFile[] files = ftpClient.listFiles(dirFtp);
			if (files.length > 0) {
				for (FTPFile ftpFile : files) {
					if (ftpFile.isDirectory()) {
						logger.info("tratando el directorio " + dirFtp + "/" + ftpFile.getName());
					} else {
						String deleteFilePath = dirFtp + "/" + ftpFile.getName();
						logger.info("Borrando archivos {}", deleteFilePath);
						ftpClient.deleteFile(deleteFilePath);
					}
				}
			}
			logger.info("borrando el directorio " + dirFtp);
			ftpClient.removeDirectory(dirFtp);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
}