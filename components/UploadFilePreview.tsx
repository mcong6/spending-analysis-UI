"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import ProgressTracker from "./ProgressTracker";

const UploadFilePreview = ({ data }) => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };
  const postData = async () => {
    console.log(JSON.stringify(data));
    const resp = await fetch("http://127.0.0.1:8000/transaction", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // alert({resp.status})
    const result = await resp.json();
    console.log(JSON.stringify(result));
    return;
  };

  if (!data || data.length == 0) {
    return <div>No Data</div>;
  }
  return (
    <div className="flex flex-col mt-3">
      

      <div className="flex flex-col items-center justify-between my-3">
        <h3 className="text-gray-600">Data Preview (First 10 rows) </h3>
      </div>
      <div className="flex gap-3 my-6 mx-6">
        <Button variant="contained" color="success" onClick={postData}>
          post Data
        </Button>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
      <Paper elevation={3} className="flex item-center mx-6">
        <Table striped bordered hover>
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
        </Table>
      </Paper>
    </div>
  );
};

export default UploadFilePreview;
