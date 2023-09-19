import { Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import { Component, ChangeEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
type Props = {};

type State = {
    selectedFiles: File[] | null;
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
            this.setState((prevState) => ({
                selectedFiles: [...(prevState.selectedFiles || []), ...Array.from(selectedFiles)],
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
            this.setState((prevState) => ({
                selectedFiles: [...(prevState.selectedFiles || []), ...Array.from(files)],
            }));
        }
    };

    removeFile = (file: File) => {
        this.setState((prevState) => ({
            selectedFiles: prevState.selectedFiles?.filter((f) => f !== file) || null,
        }));
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
                onDrop={this.handleDrop}>
                <label htmlFor="upload-image">
                    <Button variant="outlined" component="div" startIcon={<CloudUploadIcon />}>
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
                        {this.state.selectedFiles.map((file, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={file.name} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => this.removeFile(file)}
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