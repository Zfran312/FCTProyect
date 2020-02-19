package com.springboot.proyectofct.app.models.service;

import java.io.File;

import org.apache.commons.net.ftp.FTPClient;

public interface IFtpService {
	
	public FTPClient connectToFtp(String host, String user, String pass);
	
	public String uploadFileToFpt(FTPClient ftpClient, File fileLocate, String nameLocale);
	
	public void removeDirectory(FTPClient ftpClient, String serverFileName);
	
	public void disconnectFTP(FTPClient ftpClient);
	
}
