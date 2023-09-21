package br.com.arcelino.uploadfileapi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.arcelino.uploadfileapi.api.FileWithDescription;
import br.com.arcelino.uploadfileapi.api.FileWithDescriptionResponse;
import br.com.arcelino.uploadfileapi.service.UploadDownloadFileService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UploadDownloadController {

    private final UploadDownloadFileService uploadDownloadFileService;

    @GetMapping("/all")
    public List<FileWithDescriptionResponse> all() {
        return uploadDownloadFileService.all();
    }

    @PostMapping("/upload")
    public ResponseEntity<Void> uploadFiles(@RequestBody List<FileWithDescription> filesWithDescription) {
        uploadDownloadFileService.uploadFile(filesWithDescription);
        return ResponseEntity.ok().build();
    }
}
