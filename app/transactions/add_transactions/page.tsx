"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import FileUpload from "@/components/FileUpload";
import FileConfig from "@/components/FileConfig";

const steps = ["Upload File", "Configure Columns"];

const AddTransactionPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]); // State to hold selected files
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [headerMap, setHeaderMap] = useState<{ [key: string]: string }>({});
  const [dataSource, setDataSource] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission loading

  // Effect to process files whenever the 'files' state changes
  useEffect(() => {
    if (files.length > 0) {
      let allData: any[] = [];
      let allHeaders: string[] = [];

      const processFile = (file: File) => {
        return new Promise<void>((resolve) => {
          Papa.parse(file, {
            header: true,
            complete: function (results) {
              allData = allData.concat(results.data);
              if (results.meta.fields) {
                allHeaders = Array.from(new Set([...allHeaders, ...results.meta.fields]));
              }
              resolve();
            },
            error: function(err) {
              console.error("Error parsing file:", file.name, err);
              resolve(); // Resolve even on error to continue processing other files
            }
          });
        });
      };

      Promise.all(files.map(processFile)).then(() => {
        setData(allData);
        setHeaders(allHeaders);
      });
    } else {
      setData([]);
      setHeaders([]);
    }
  }, [files]); // Dependency array: run this effect when 'files' changes

  const handleSubmit = async () => {
    setIsSubmitting(true); // Set loading state
    const transactionsToSend = data.map(row => {
      const newTransaction: { [key: string]: any } = {};

      // Apply mapped headers
      for (const csvHeader in headerMap) {
        const apiField = headerMap[csvHeader];
        if (row[csvHeader] !== undefined) {
          newTransaction[apiField] = row[csvHeader];
        }
      }

      // Map 'type' from UI to 'type_name' for API
      if (newTransaction.type !== undefined) {
        newTransaction.type_name = newTransaction.type;
        delete newTransaction.type;
      }

      // Ensure all required API fields are present, providing defaults if not mapped
      newTransaction.transaction_date = newTransaction.transaction_date || "";
      newTransaction.description = newTransaction.description || "";
      newTransaction.notes = newTransaction.notes || ""; 
      newTransaction.category_level1 = newTransaction.category_level1 || ""; 
      newTransaction.category_level2 = newTransaction.category_level2 || "";
      newTransaction.type_name = newTransaction.type_name || ""; 

      newTransaction.amount = parseFloat(newTransaction.amount) || 0.0; 

      // Add the data source
      newTransaction.source = dataSource;

      return newTransaction;
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionsToSend),
      });

      if (response.ok) {
        alert("Transactions uploaded successfully!");
        setActiveStep(0);
        setFiles([]);
        setData([]);
        setHeaders([]);
        setHeaderMap({});
        setDataSource('');
      } else {
        const errorData = await response.json();
        alert(`Failed to upload transactions: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error uploading transactions:", error);
      alert("An error occurred while uploading transactions.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FileUpload
            files={files} 
            setFiles={setFiles}
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
        );
      case 1:
        return (
          <FileConfig
            data={data}
            headers={headers}
            headerMap={headerMap}
            setHeaderMap={setHeaderMap}
            dataSource={dataSource}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const isNextDisabled = () => {
    if (activeStep === 0 && (files.length === 0 || !dataSource)) {
      return true;
    }
    if (activeStep === 1 && Object.keys(headerMap).length === 0) {
      return true;
    }
    return false;
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Add Transactions
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
              disabled={isNextDisabled() || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : (activeStep === steps.length - 1 ? "Submit" : "Next")}
            </Button>
          </Box>
        </>
      </Paper>
    </Container>
  );
};

export default AddTransactionPage;