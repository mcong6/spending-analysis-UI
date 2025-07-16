"use client";
import FileConfig from "@/components/FileConfig";
import FileUpload from "@/components/FileUpload";
import UploadFilePreview from "@/components/UploadFilePreview";
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const steps = ["Upload File", "Configure Columns", "Preview and Submit"];

const AddTransaction = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [data, setData] = useState([]);
  const [headerMap, setHeaderMap] = useState({});
  const [transDate, setTransDate] = React.useState("");
  const [headers, setHeaders] = useState(["No Options"]);
  const [configDone, setConfigDone] = useState(false);

  const handleTransDateChange = (event: SelectChangeEvent) => {
    setTransDate(event.target.value as string);
    headerMap[event.target.value] = "transaction_date";
    setHeaderMap(headerMap);
  };

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event: SelectChangeEvent) => {
    setDescription(event.target.value as string);
    headerMap[event.target.value] = "description";
    setHeaderMap(headerMap);
  };

  const [notes, setNotes] = useState("");
  const handleNotesChange = (event: SelectChangeEvent) => {
    setNotes(event.target.value as string);
    headerMap[event.target.value] = "notes";
    setHeaderMap(headerMap);
  };

  const [transType, setTransType] = useState("");
  const handleTypeChange = (event: SelectChangeEvent) => {
    setTransType(event.target.value as string);
    headerMap[event.target.value] = "type";
    setHeaderMap(headerMap);
  };

  const [amount, setAmount] = useState("");
  const handleAmountChange = (event: SelectChangeEvent) => {
    setAmount(event.target.value as number);
    headerMap[event.target.value] = "amount";
    setHeaderMap(headerMap);
  };

  const [source, setSource] = useState("");
  const handleSourceChange = (event: SelectChangeEvent) => {
    setSource(event.target.value as string);
    headerMap[event.target.value] = "source";
    setHeaderMap(headerMap);
  };

  const [secondaryCategory, setSecondaryCategory] = useState("");
  const handleSecondaryCategoryChange = (event: SelectChangeEvent) => {
    setSecondaryCategory(event.target.value as string);
    headerMap[event.target.value] = "category_level2";
    setHeaderMap(headerMap);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FileUpload
            setFileUploaded={setFileUploaded}
            activeStep={0}
            setData={setData}
            setHeaders={setHeaders}
          />
        );
      case 1:
        return (
          <FileConfig
            activeStep={1}
            data={data}
            setData={setData}
            headerMap={headerMap}
            headers={headers}
            setHeaders={setHeaders}
            transDate={transDate}
            handleTransDateChange={handleTransDateChange}
            description={description}
            handleDescriptionChange={handleDescriptionChange}
            notes={notes}
            handleNotesChange={handleNotesChange}
            transType={transType}
            handleTypeChange={handleTypeChange}
            amount={amount}
            handleAmountChange={handleAmountChange}
            source={source}
            handleSourceChange={handleSourceChange}
            secondaryCategory={secondaryCategory}
            handleSecondaryCategoryChange={handleSecondaryCategoryChange}
            setConfigDone={setConfigDone}
          />
        );
      case 2:
        return <UploadFilePreview activeStep={2} data={data} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep)}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !fileUploaded) ||
              (activeStep === 1 && !configDone)
            }
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default AddTransaction;