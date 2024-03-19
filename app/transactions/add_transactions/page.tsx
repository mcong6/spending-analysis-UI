"use client";
import FileConfig from "@/components/FileConfig";
import FileUpload from "@/components/FileUpload";
import UploadFilePreview from "@/components/UploadFilePreview";
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

const AddTransaction = () => {
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

  // const [primaryCategory, setPrimaryCategory] = useState("");
  // const handlePrimaryCategoryChange = (event: SelectChangeEvent) => {
  //   setPrimaryCategory(event.target.value as string);
  //   headerMap[event.target.value] = "category_level1";
  //   setHeaderMap(headerMap);
  // };

  const [secondaryCategory, setSecondaryCategory] = useState("");
  const handleSecondaryCategoryChange = (event: SelectChangeEvent) => {
    setSecondaryCategory(event.target.value as string);
    headerMap[event.target.value] = "category_level2";
    setHeaderMap(headerMap);
  };

  return (
    <div>
      {!fileUploaded && !configDone && (
        <FileUpload
          setFileUploaded={setFileUploaded}
          activeStep={0}
          setData={setData}
          setHeaders={setHeaders}
        />
      )}

      {fileUploaded && !configDone && (
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
          // primaryCategory={primaryCategory}
          // handlePrimaryCategoryChange={handlePrimaryCategoryChange}
          secondaryCategory={secondaryCategory}
          handleSecondaryCategoryChange={handleSecondaryCategoryChange}
          setConfigDone={setConfigDone}
        />
      )}

      {fileUploaded && configDone && <UploadFilePreview activeStep={2} data={data} />}
    </div>
  );
};

export default AddTransaction;
