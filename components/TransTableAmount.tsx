"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BasicBars from "@/utils/barchart";
import useSWR from "swr";

const TransTableAmount = (activatePeriod) => {
  const [period, setPeriod] = useState("quarter");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");

  //   console.log(`http://localhost:8000/statistics_by_date?by=${period}&startDate=${startDate}&endDate=${endDate}`)
  //   const res = await fetch(
  //     `http://localhost:8000/statistics_by_date?by=${period}&startDate=${startDate}&endDate=${endDate}`
  //   );
  //   const data = await res.json();
  //   setTransAmount(data);
  // };
  const fetcher = async () => {
    console.log(
      `http://localhost:8000/statistics_by_date?by=${period}&startDate=${startDate}&endDate=${endDate}`
    );
    const res = await fetch(
      `http://localhost:8000/statistics_by_date?by=${period}&startDate=${startDate}&endDate=${endDate}`
    );
    const data = await res.json();
    return data;
  };

  const {
    data: transAmount,
    isLoading,
    error,
  } = useSWR(
    `statistics_by_date?by=${period}&startDate=${startDate}&endDate=${endDate}`,
    fetcher
  );

  if (transAmount) {
    return (
      <div>
        <div>Transaction by Date</div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setPeriod("month");
            }}
          >
            Monthly
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPeriod("quarter");
            }}
          >
            Quarterly
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPeriod("year");
            }}
          >
            Yearly
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPeriod("day");
            }}
          >
            Daily
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Start Date"
                openTo="year"
                format="YYYY-MM-DD"
                onAccept={(newValue) => {
                  setStartDate(newValue.format("YYYY-MM-DD"));
                }}
              />
              <DatePicker
                label="End Date"
                openTo="year"
                format="YYYY-MM-DD"
                onAccept={(newValue) => {
                  setEndDate(newValue.format("YYYY-MM-DD"));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {/* <TextField id="filled-basic" label="Start Date" variant="filled" onChange={(event)=>{setStartDate(event?.target.value)}}/> */}
          {/* <TextField id="filled-basic" label="End Date" variant="filled" onChange={(event)=>{setEndDate(event?.target.value)}}/> */}
        </div>
        <div>
          <BasicBars dataSet={transAmount.data} datakey={"date"} />
        </div>

        <TableContainer component={Paper} className="flex w-1/2">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transAmount.data.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex gap-10">
          <div>Total Amount:{transAmount.total.toFixed(2)}</div>
          <div>Count:{transAmount.count}</div>
          <div>Max Amount:{transAmount.max.toFixed(2)}</div>
          <div>Min Amount:{transAmount.min.toFixed(2)}</div>
        </div>
      </div>
    );
  } else {
    return <div>Transaction by Date</div>;
  }
};

export default TransTableAmount;
