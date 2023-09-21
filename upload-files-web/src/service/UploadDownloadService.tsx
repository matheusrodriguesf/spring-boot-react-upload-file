import FileWithDescriptionResponse from "../api/FileWithDescriptionResponse";

class UploadDownloadService {
    private static readonly staticUrl = 'http://localhost:8080/files';

    async uploadFiles(filesAsBase64: any): Promise<void> {
        const response = await fetch(`${UploadDownloadService.staticUrl}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filesAsBase64),
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar arquivos.');
        }

    }

    async all(): Promise<FileWithDescriptionResponse[]> {
        const response = await fetch(`${UploadDownloadService.staticUrl}/all`);

        if (!response.ok) {
            throw new Error('Erro ao buscar arquivos.');
        }

        return response.json();
    }

}

export default UploadDownloadService;