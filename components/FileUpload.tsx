"use client";
import React, { ChangeEvent, useState, DragEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileUploadProps {
  files: File[]; // Now directly receives files from parent
  setFiles: (files: File[]) => void;
  dataSource: string;
  setDataSource: (source: string) => void;
}

const FileUpload = ({
  files,
  setFiles,
  dataSource,
  setDataSource,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const addUniqueFiles = (newFiles: File[]) => {
    const uniqueNewFiles = newFiles.filter(newFile => 
      !files.some(existingFile => 
        existingFile.name === newFile.name && existingFile.size === newFile.size
      )
    );
    setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addUniqueFiles(Array.from(e.target.files));
      e.target.value = ''; // Clear the input so the same file can be selected again if needed
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };

  const handleDataSourceChange = (event: SelectChangeEvent) => {
    setDataSource(event.target.value as string);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addUniqueFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 3,
        width: "100%",
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Upload Bank Statement Files (.csv)
      </Typography>

      {/* Data Source Dropdown - Moved to top */}
      <FormControl sx={{ mb: 3, width: "100%", maxWidth: 500 }}>
        <InputLabel id="data-source-label">Data Source</InputLabel>
        <Select
          labelId="data-source-label"
          id="data-source-select"
          value={dataSource}
          label="Data Source"
          onChange={handleDataSourceChange}
        >
          <MenuItem value="chase credit card">Chase Credit Card</MenuItem>
          <MenuItem value="chase checking account">Chase Checking Account</MenuItem>
        </Select>
      </FormControl>

      {/* Drag and Drop Container */}
      <Box
        sx={{
          p: 2,
          border: "1px dashed grey",
          borderColor: isDragging ? 'primary.main' : 'grey.400',
          width: "100%",
          maxWidth: 500,
          minHeight: 200,
          background: isDragging ? '#e3f2fd' : '#F2F3F4',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "gray",
          textAlign: "center",
          transition: 'all 0.2s ease-in-out',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUploadIcon fontSize="large" />
        <Typography>Drag and Drop Files Here</Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2, textTransform: "none" }}
        >
          Browse Files
          <input
            type="file"
            accept=".csv"
            hidden
            multiple
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      {/* Selected Files List - Moved below drag and drop */}
      {files.length > 0 && (
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 2,
            mt: 3, // Add margin top to separate from drag and drop
            border: "1px solid",
            borderColor: 'grey.300',
            borderRadius: 1,
            minHeight: 100,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Selected Files:
          </Typography>
          <List dense sx={{ flexGrow: 1, overflow: 'auto', maxHeight: 150 }}>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;