"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Papa from "papaparse";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import postData from "@/utils/postData";
import ProgressTracker from "./ProgressTracker";
import { useRouter } from "next/navigation";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FileUploadProps {
  setFileUploaded: object;
  activeStep: number;
  setData: () => void;
  setHeaders: () => void;
}
const FileUpload = ({setFileUploaded,activeStep,setData,setHeaders}:FileUploadProps) => {

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
        // console.log(results.meta["fields"]);
        // console.log(results.data);
      },
    });
  };

  // useEffect(() => {
  //   console.log("sdfsdfsdfsfd");
  // }, [data]);

  // const sendingData = () => {
  //   postData(data);
  // };
  // const postData1 = async () => {
  //   console.log("asdfasdfasdfasdfasdfasdf");
  //   console.log(JSON.stringify(data));
  //   const resp = await fetch("http://127.0.0.1:8000/transaction", {
  //     method: "POST",
  //     cache: "no-cache",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const result = await resp.json();

  //   return result;
  // };

  // const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between mt-3">
      {/* progress tracker */}
      <ProgressTracker activeStep={activeStep} />

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
                  <CloudUploadIcon fontSize="large" />
                </div>
                <p>Drag and Drop Files Here</p>
                <Button
                  variant="contained"
                  style={{ textTransform: "none" }}
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
            {selectFile &&(
              <div className="flex items-center gap-3">
              <CheckCircleIcon color="success" fontSize="large"/>
              {/* <DescriptionIcon color="success" fontSize="large"/> */}
              <p>{fileName}</p>
              
              </div>
            )}
          </Box>
        </div>
        <div className="flex  w-full items-center justify-end">
          <Button variant="contained" onClick={() => setFileUploaded(true)}>
            next
          </Button>
        </div>
      </div>

      {/* 
      <div className="flex items-center justify-between">
        <form onSubmit={handleOnSubmit} className="w-60 flex flex-col gap-3">
          <FormControl fullWidth>
            <InputLabel id="transaction-date">Transaction Date</InputLabel>
            <Select
              labelId="transaction-date"
              id="transaction-date"
              value={transDate}
              label="transDate"
              onChange={handleChange}
            >
              {headers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="transaction-description">Description</InputLabel>
            <Select
              labelId="transaction-description"
              id="transaction-description"
              value={description}
              label="description"
              onChange={handleDescriptionChange}
            >
              {headers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="transaction-notes">Notes</InputLabel>
            <Select
              labelId="transaction-notes"
              id="transaction-notes"
              value={notes}
              label="notes"
              onChange={handleNotesChange}
            >
              {headers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="transaction-type">Type</InputLabel>
            <Select
              labelId="transaction-type"
              id="transaction-type"
              value={transType}
              label="transType"
              onChange={handleTypeChange}
            >
              {headers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="transaction-amount">Amount</InputLabel>
            <Select
              labelId="transaction-amount"
              id="transaction-amount"
              value={amount}
              label="amount"
              onChange={handleAmountChange}
            >
              {headers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="flex gap-3 items-center justify-end">
            <button className="px-6 py-3 bg-blue-500 rounded-xl text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="my-5">
        <button
          className="px-6 py-3 bg-blue-500 rounded-xl text-white"
          onClick={postData1}
        >
          Confirm and Upload
        </button>
      </div>

      {renderTable && data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((item, index) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key, idx) => (
                  <td>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* <UploadFilePreview data={data} /> */}
    </div>
  );
};

export default FileUpload;

