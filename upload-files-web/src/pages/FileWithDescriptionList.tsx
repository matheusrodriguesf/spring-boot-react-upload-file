import React from "react";
import UploadDownloadService from "../service/UploadDownloadService";
import FileWithDescriptionResponse from "../api/FileWithDescriptionResponse";
import { List, ListItem, IconButton, ListItemText, Box } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

type Props = {};

type State = {
    selectedFiles: FileWithDescriptionResponse[];
    focusedIndex: number | null;
};

class FileWithDescriptionList extends React.Component<Props, State> {
    private readonly uploadDownloadService = new UploadDownloadService();

    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.state = {
            selectedFiles: [],
            focusedIndex: null,
        };
    }

    async componentDidMount() {
        const files = await this.uploadDownloadService.all();
        this.setState({ selectedFiles: files });
    }

    handleMouseEnter = (index: number) => {
        this.setState({ focusedIndex: index });
    };

    handleMouseLeave = () => {
        this.setState({ focusedIndex: null });
    };

    handleDownloadClick = async (file: FileWithDescriptionResponse) => {
        try {
            const downloadUrl = `/api/download/${file.id}`;
            const response = await fetch(downloadUrl, {
                method: "GET",
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = file.filename;
                document.body.appendChild(a);
                a.click();

                window.URL.revokeObjectURL(url);
            } else {
                console.error("Falha ao baixar o arquivo");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    render() {
        const { selectedFiles, focusedIndex } = this.state;
        return (
            <div>
                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                    {selectedFiles.map((file, index) => (
                        <ListItem
                            key={file.id}
                            onMouseEnter={() => this.handleMouseEnter(index)}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ListItemText primary={file.filename} />
                            </Box>
                            <IconButton
                                aria-label="download"
                                onClick={() => this.handleDownloadClick(file)}
                            >
                                <GetAppIcon />
                            </IconButton>
                            {focusedIndex === index && <div>{file.description}</div>}
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default FileWithDescriptionList;
