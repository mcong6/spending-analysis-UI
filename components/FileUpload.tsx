"use client";
import React, {ChangeEvent, useState} from "react";
import Papa from "papaparse";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {Box, Button, TextField,} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FileUploadProps {
    setFileUploaded: (value: boolean) => void;
    setData: (data: any[]) => void;
    setHeaders: (headers: string[]) => void;
}

const FileUpload = ({setFileUploaded, setData, setHeaders}: FileUploadProps) => {

    const [selectFile, setSelectFile] = useState(false);
    const [fileName, setFileName] = useState("");
    const [givenFileName, setGivenFileName] = useState("");

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectFile(true);
        const file = e.target.files[0];
        setFileName(e.target.files[0]["name"]);
        Papa.parse(file, {
            header: true,
            complete: function (results) {
                setData(results.data);
                setHeaders(results.meta["fields"]);
                setFileUploaded(true)
            },
        });
    };
    return (
        <div className="flex flex-col items-center justify-between mt-3">
            {/* upload file section */}
            <div className="flex flex-col justify-center items-center gap-3 my-3 w-[500px]">
                <h3 className="text-gray-600">Upload Bank Statement Files (.csv)</h3>
                <div className="flex items-center justify-center w-full ">
                    <TextField
                        className="w-full"
                        size="small"
                        id="outlined-basic"
                        label="File Name"
                        variant="outlined"
                        onChange={(event: object) => setGivenFileName(event.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Box
                        component="section"
                        className="w-full m-0 p-0"
                        sx={{
                            p: 2,
                            border: "1px dashed grey",
                            height: "200px",
                            background: "#F2F3F4",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "gray",
                        }}
                    >
                        {!selectFile && (
                            <>
                                <div>
                                    <CloudUploadIcon fontSize="large"/>
                                </div>
                                <p>Drag and Drop Files Here</p>
                                <Button
                                    variant="contained"
                                    style={{textTransform: "none"}}
                                    className="my-3"
                                    component="label"
                                >
                                    Browse Files
                                    <input
                                        type="file"
                                        accept=".csv"
                                        hidden
                                        onChange={handleFileUpload}
                                    />
                                </Button>
                            </>
                        )}
                        {selectFile && (
                            <div className="flex items-center gap-3">
                                <CheckCircleIcon color="success" fontSize="large"/>
                                {/* <DescriptionIcon color="success" fontSize="large"/> */}
                                <p>{fileName}</p>

                            </div>
                        )}
                    </Box>
                </div>
            </div>
        </div>
    );
};


export default FileUpload;

