import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Props = {};

type FileWithDescription = {
    file: File;
    description: string;
};

type State = {
    selectedFiles: FileWithDescription[] | null;
};

class UploadFile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedFiles: null,
        };
    }

    handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const filesWithDescription = Array.from(selectedFiles).map((file) => ({
                file,
                description: "",
            }));
            this.setState((prevState) => ({
                selectedFiles: [...(prevState.selectedFiles || []), ...filesWithDescription],
            }));
        }
    };

    handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const { files } = event.dataTransfer;
        if (files.length > 0) {
            const filesWithDescription = Array.from(files).map((file) => ({
                file,
                description: "",
            }));
            this.setState((prevState) => ({
                selectedFiles: [...(prevState.selectedFiles || []), ...filesWithDescription],
            }));
        }
    };

    removeFile = (file: FileWithDescription) => {
        this.setState((prevState) => ({
            selectedFiles:
                prevState.selectedFiles?.filter((f) => f !== file) || null,
        }));
    };

    handleDescriptionChange = (
        event: ChangeEvent<HTMLInputElement>,
        fileWithDescription: FileWithDescription
    ) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            selectedFiles: prevState.selectedFiles?.map((f) =>
                f === fileWithDescription ? { ...f, description: value } : f
            ) || null,
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
                selectedFiles: prevState.selectedFiles?.map((f) =>
                    f === fileWithDescription ? { ...f, description: value } : f
                ) || null,
            }));
        }
    };

    render() {
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
                    <Button
                        variant="outlined"
                        component="div"
                        startIcon={<CloudUploadIcon />}
                    >
                        Anexar Arquivos
                    </Button>
                </label>
                <input
                    id="upload-image"
                    hidden
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={this.handleFileChange}
                />
                {this.state.selectedFiles && this.state.selectedFiles.length > 0 && (
                    <List>
                        {this.state.selectedFiles.map((fileWithDescription, index) => (
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
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        );
    }
}

export default UploadFile;