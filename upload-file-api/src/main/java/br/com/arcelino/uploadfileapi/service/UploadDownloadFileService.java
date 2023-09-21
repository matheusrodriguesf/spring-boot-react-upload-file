package br.com.arcelino.uploadfileapi.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.arcelino.uploadfileapi.api.FileWithDescription;
import br.com.arcelino.uploadfileapi.api.FileWithDescriptionResponse;
import br.com.arcelino.uploadfileapi.entity.ArquivoAnexo;
import br.com.arcelino.uploadfileapi.repository.ArquivoAnexoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadDownloadFileService {

    private static final String DIRETORIO_ANEXO = "anexos";

    private final ArquivoAnexoRepository arquivoAnexoRepository;
    private final ArquivoService arquivoService;

    public List<FileWithDescriptionResponse> all() {
        return arquivoAnexoRepository.findAllProjectedBy();
    }

    @Transactional
    public void uploadFile(List<FileWithDescription> filesWithDescription) {
        filesWithDescription.forEach(this::processFile);
    }

    private void processFile(FileWithDescription fileWithDescription) {
        try {
            var base64Data = fileWithDescription.getBase64Data();
            var data = Base64.getDecoder().decode(base64Data);
            var fileName = fileWithDescription.getFilename();

            try (OutputStream os = new FileOutputStream(arquivoService.getFile(fileName, DIRETORIO_ANEXO, true))) {
                os.write(data);
                var arquivoAnexo = ArquivoAnexo.builder()
                        .nome(fileName)
                        .descricao(fileWithDescription.getDescription())
                        .build();
                arquivoAnexoRepository.save(arquivoAnexo);
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("Arquivo salvo com sucesso: " + fileName);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
