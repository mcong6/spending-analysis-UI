"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

interface FileConfigProps {
  data: any[];
  headers: string[];
  headerMap: { [key: string]: string };
  setHeaderMap: (headerMap: { [key: string]: string }) => void;
  dataSource: string;
}

const transactionFields = [
  { id: "transaction_date", label: "Transaction Date", aliases: ["Date", "Transaction Date", "Post Date", "Posting Date"] },
  { id: "description", label: "Description", aliases: ["Description", "Memo", "Payee"] },
  { id: "type", label: "Type", aliases: ["Type", "Transaction Type"] },
  { id: "amount", label: "Amount", aliases: ["Amount", "Debit", "Credit"] },
  { id: "category_level2", label: "Secondary Category", aliases: ["Category", "Subcategory"] },
];

const FileConfig = ({ data, headers, headerMap, setHeaderMap, dataSource }: FileConfigProps) => {
  const [manualHeaderMap, setManualHeaderMap] = useState<{ [key: string]: string }>({});

  // Effect for auto-mapping initialization
  useEffect(() => {
    // Only auto-map if headers or dataSource change, and manualHeaderMap is empty
    // This ensures that auto-mapping only happens on initial load or when new files are uploaded
    // and doesn't overwrite user's manual changes.
    if (headers.length > 0 && Object.keys(manualHeaderMap).length === 0) {
      const newHeaderMap: { [key: string]: string } = {};
      const lowerCaseHeaders = headers.map(h => h.toLowerCase());

      transactionFields.forEach(field => {
        const foundAlias = field.aliases.find(alias => lowerCaseHeaders.includes(alias.toLowerCase()));
        if (foundAlias) {
          const originalHeader = headers.find(h => h.toLowerCase() === foundAlias.toLowerCase());
          if (originalHeader) {
            newHeaderMap[originalHeader] = field.id;
          }
        }
      });
      setManualHeaderMap(newHeaderMap);
    }
  }, [headers, dataSource]); // Dependencies: headers and dataSource

  // Effect to propagate manualHeaderMap changes to parent's headerMap
  useEffect(() => {
    // Only update parent headerMap if it's actually different
    if (JSON.stringify(manualHeaderMap) !== JSON.stringify(headerMap)) {
      setHeaderMap(manualHeaderMap);
    }
  }, [manualHeaderMap, setHeaderMap, headerMap]); // Dependencies: manualHeaderMap and parent's setHeaderMap

  const handleHeaderChange = (
    event: SelectChangeEvent<string>,
    fieldId: string
  ) => {
    const { value } = event.target;
    const updatedMap = { ...manualHeaderMap };
    
    // Remove the old mapping for this fieldId if it exists
    for (const key in updatedMap) {
      if (updatedMap[key] === fieldId) {
        delete updatedMap[key];
      }
    }
    // Add the new mapping
    updatedMap[value] = fieldId;
    setManualHeaderMap(updatedMap);
  };

  const getMappedHeader = (fieldId: string) => {
    return Object.keys(manualHeaderMap).find(key => manualHeaderMap[key] === fieldId) || "";
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Configure Columns
      </Typography>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Data Preview (First 5 rows):
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 200, overflow: 'auto', mb: 3 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} sx={{ fontWeight: 'bold' }}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, 5).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header) => (
                  <TableCell key={`${rowIndex}-${header}`}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Map your file columns to transaction fields:
      </Typography>
      <Grid container spacing={2}>
        {transactionFields.map((field) => {
          const currentMappedHeader = getMappedHeader(field.id);
          const isAutoMapped = Object.keys(headerMap).some(key => headerMap[key] === field.id && key === currentMappedHeader);

          return (
            <Grid item xs={12} sm={6} key={field.id}>
              <FormControl fullWidth>
                <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
                <Select
                  labelId={`${field.id}-label`}
                  id={field.id}
                  value={currentMappedHeader}
                  onChange={(e) => handleHeaderChange(e, field.id)}
                  label={field.label}
                  sx={{ 
                    backgroundColor: isAutoMapped ? '#e8f5e9' : 'inherit', // Light green for auto-mapped
                  }}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {headers.map((header) => {
                    const isMappedToAnotherField = Object.keys(manualHeaderMap).some(
                      (key) => manualHeaderMap[key] === header && key !== currentMappedHeader
                    );
                    return (
                      <MenuItem
                        key={header}
                        value={header}
                        disabled={isMappedToAnotherField}
                      >
                        {header}
                        {isMappedToAnotherField && " (Mapped elsewhere)"}
                      </MenuItem>
                    );
                  })}
                </Select>
                {isAutoMapped && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    Auto-mapped
                  </Typography>
                )}
              </FormControl>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FileConfig;
