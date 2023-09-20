package br.com.arcelino.uploadfileapi.service;

import java.util.Base64;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.arcelino.uploadfileapi.api.FileWithDescription;

@Service
public class UploadDownloadFileService {

    public void uploadFile(List<FileWithDescription> filesWithDescription) {
        filesWithDescription.forEach(fileWithDescription -> {
            var base64Data = fileWithDescription.getBase64Data();
            var data = Base64.getDecoder().decode(base64Data);
            System.out.println("Description: " + fileWithDescription.getDescription());
            System.out.println("Data: " + new String(data));

        });
    }

}
