package br.com.arcelino.uploadfileapi.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Service
@RequiredArgsConstructor
public class ArquivoService {

    @Value("${folder-path}")
    private String folder;

    @SneakyThrows
    public File getFile(String filename, String subFolderName, boolean create) {
        var file = new File(getSubFolder(subFolderName), filename);
        try {
            if (create) {
                if (file.exists()) {
                    Files.deleteIfExists(file.toPath());
                }
                var success = file.createNewFile();
                if (!success) {
                    throw new ServiceException("Falha ao criar arquivo.");
                }
            } else if (!file.exists() || !file.isFile()) {
                throw new ServiceException("Arquivo inacessível.");
            }
        } catch (IOException e) {
            throw new ServiceException("Erro ao criar arquivo.", e);
        }
        return file;
    }

    private File getSubFolder(String folderName) throws ServiceException {
        File folder = new File(getAppFolder(), folderName);
        if (!folder.exists() || !folder.isDirectory()) {
            boolean isCreated = folder.mkdir();
            if (!isCreated) {
                throw new ServiceException("A pasta " + folderName + " é inacessível.");
            }
        }
        return folder;
    }

    private File getAppFolder() throws ServiceException {
        File folder = new File(getRootFolder(), "teste");
        if (!folder.exists() || !folder.isDirectory()) {
            boolean isCreated = folder.mkdir();
            if (!isCreated) {
                throw new ServiceException("O diretório da aplicação é inacessível.");
            }
        }
        return folder;
    }

    private File getRootFolder() {
        var path = getPath();
        var folder = new File(path);
        if (!folder.isDirectory()) {
            throw new ServiceException("Diretório raiz inacessível.");
        }
        return folder;
    }

    private String getPath() {
        return Optional
                .ofNullable(folder)
                .orElse(System.getProperty("java.io.tmpdir"));
    }
}
