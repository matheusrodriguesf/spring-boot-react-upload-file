package br.com.arcelino.uploadfileapi.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import br.com.arcelino.uploadfileapi.api.FileWithDescription;

@Service
public class UploadDownloadFileService {

    @Value("${folder-path}")
    private String folder;

    public void uploadFile(List<FileWithDescription> filesWithDescription) {
        filesWithDescription.forEach(fileWithDescription -> {
            var base64Data = fileWithDescription.getBase64Data();
            var data = Base64.getDecoder().decode(base64Data);
            var fileName = fileWithDescription.getFilename();
            var filePath = folder + fileName;

            try {
                Files.write(Path.of(filePath), data, StandardOpenOption.CREATE);
                System.out.println("Arquivo salvo em: " + filePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}