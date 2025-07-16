"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Papa from "papaparse";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ProgressTracker from "./ProgressTracker";

const FileConfig = ({
  data,
  setData,
  headerMap,
  headers,
  setHeaders,
  transDate,
  handleTransDateChange,
  description,
  handleDescriptionChange,
  notes,
  handleNotesChange,
  transType,
  handleTypeChange,
  amount,
  handleAmountChange,
  source,
  handleSourceChange,
  // primaryCategory,
  // handlePrimaryCategoryChange,
  secondaryCategory,
  handleSecondaryCategoryChange,
  setConfigDone,
}) => {
  const cleanData = () => {
    for (let i = 0; i < data.length; i++) {
      for (let key of Object.keys(data[i])) {
        if (!headerMap.hasOwnProperty(key)) {
          delete data[i][key];
        }
      }
    }
  };
  const handleConfirm = (e) => {
    e.preventDefault();
    console.log(data);

    cleanData();
    for (let i = 0; i < data.length; i++) {
      for (let key of Object.keys(data[i])) {
        if (key in data[i] && key in headerMap) {
          data[i][headerMap[key]] = data[i][key];
          delete data[i][key];
        }
      }
    }
    setData(data);
    setConfigDone(true);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-3 ">
      {/* Map column names */}
      <div className="flex flex-col items-center justify-between my-3">
        <h3 className="text-gray-600">Map Column Names</h3>
        <form className="w-60 flex flex-col gap-3">
          <FormControl fullWidth>
            <InputLabel id="transaction-date">Transaction Date</InputLabel>
            <Select
              labelId="transaction-date"
              id="transaction-date"
              value={transDate}
              label="transDate"
              onChange={handleTransDateChange}
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

          <FormControl fullWidth>
            <InputLabel id="transaction-source">Source</InputLabel>
            <Select
              labelId="transaction-source"
              id="transaction-source"
              value={source}
              label="source"
              onChange={handleSourceChange}
            >
              {headers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl fullWidth>
            <InputLabel id="transaction-primary-category">
              Primary Category
            </InputLabel>
            <Select
              labelId="transaction-primary-category"
              id="transaction-primary-category"
              value={primaryCategory}
              label="primaryCategory"
              onChange={handlePrimaryCategoryChange}
            >
              {headers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <FormControl fullWidth>
            <InputLabel id="transaction-ssecondary-category">
              Secondary Category
            </InputLabel>
            <Select
              labelId="transaction-ssecondary-category"
              id="transaction-ssecondary-category"
              value={secondaryCategory}
              label="secondaryCategory"
              onChange={handleSecondaryCategoryChange}
            >
              {headers.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="flex gap-3 items-center justify-end">
            <Button onClick={handleConfirm} variant="contained">
              confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileConfig;
