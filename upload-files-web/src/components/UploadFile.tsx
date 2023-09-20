import React, { Component, ChangeEvent, DragEvent } from "react";
import { Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";

type Props = {};

type FileWithDescription = {
    file: File;
    description: string;
};

type State = {
    selectedFiles: FileWithDescription[];
    errorMessage: string | null;
};

class UploadFile extends Component<Props, State> {
    state: State = {
        selectedFiles: [],
        errorMessage: null,
    };

    handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {

            if (selectedFiles.length + this.state.selectedFiles.length > 5) {
                this.setState({ errorMessage: "Você pode anexar no máximo 5 arquivos." });
                return;
            }

            const filesWithDescription = Array.from(selectedFiles).map((file) => ({
                file,
                description: "",
            }));
            const maxSizeBytes = 5 * 1024 * 1024;

            const validFiles = filesWithDescription.filter((file) => file.file.size <= maxSizeBytes);
            const invalidFiles = filesWithDescription.filter((file) => file.file.size > maxSizeBytes);

            if (invalidFiles.length > 0) {
                this.setState({ errorMessage: "Alguns arquivos são maiores que 5MB e não foram anexados." });
            } else {
                this.setState((prevState) => ({
                    selectedFiles: [...prevState.selectedFiles, ...validFiles],
                    errorMessage: null,
                }));
            }
        }
    };

    handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const { files } = event.dataTransfer;
        if (files.length > 0) {
            const filesWithDescription = Array.from(files).map((file) => ({
                file,
                description: "",
            }));
            this.setState((prevState) => ({
                selectedFiles: [...prevState.selectedFiles, ...filesWithDescription],
            }));
        }
    };

    removeFile = (file: FileWithDescription) => {
        this.setState((prevState) => ({
            selectedFiles: prevState.selectedFiles.filter((f) => f !== file),
        }));
    };

    saveDescription = (fileWithDescription: FileWithDescription) => {
        console.log("Descrição salva:", fileWithDescription.description);
    };

    handleDescriptionChange = (
        event: ChangeEvent<HTMLInputElement>,
        fileWithDescription: FileWithDescription
    ) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            selectedFiles: prevState.selectedFiles.map((f) =>
                f === fileWithDescription ? { ...f, description: value } : f
            ),
        }));
    };

    handleDescriptionKeyUp = (
        event: React.KeyboardEvent<HTMLInputElement>,
        fileWithDescription: FileWithDescription
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const { value } = event.currentTarget;
            this.setState((prevState) => ({
                selectedFiles: prevState.selectedFiles.map((f) =>
                    f === fileWithDescription ? { ...f, description: value } : f
                ),
            }));
        }
    };

    handleUploadClick = () => {
        console.log("Arquivos e descrições enviados:", this.state.selectedFiles);
    };

    render() {
        const { selectedFiles } = this.state;
        return (
            <Box
                m={2}
                p={2}
                border={1}
                borderColor="grey.300"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <label htmlFor="upload-image">
                    <Button variant="outlined" component="div" startIcon={<CloudUploadIcon />}>
                        Anexar Arquivos
                    </Button>
                </label>
                <input
                    id="upload-image"
                    hidden
                    accept="image/*,.pdf"
                    type="file"
                    multiple
                    onChange={this.handleFileChange}
                />
                {selectedFiles.length > 0 && (
                    <div>
                        <List>
                            {selectedFiles.map((fileWithDescription, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={fileWithDescription.file.name} />
                                    <TextField
                                        label="Descrição"
                                        variant="outlined"
                                        size="small"
                                        value={fileWithDescription.description}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                            this.handleDescriptionChange(event, fileWithDescription)
                                        }
                                        onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) =>
                                            this.handleDescriptionKeyUp(event, fileWithDescription)
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => this.removeFile(fileWithDescription)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="save"
                                            onClick={() => this.saveDescription(fileWithDescription)}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleUploadClick}
                            >
                                Enviar
                            </Button>
                        </div>

                    </div>
                )}
            </Box>
        );
    }
}

export default UploadFile;