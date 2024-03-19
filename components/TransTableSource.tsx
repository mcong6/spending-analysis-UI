import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const TransTableSource = (activatePeriod) => {
const [transSource, setTransSource] = useState(null);

const FetchTransCategoryData = async () => {
  const res = await fetch(
    `http://localhost:8000/statistics_by_source?startDate=2023-01-01&endDate=2023-12-01`
  );
  const data = await res.json();
  setTransSource(data);
};

useEffect(() => {
  FetchTransCategoryData();
}, [activatePeriod]);

if (transSource) {
  return (
    <div>
      <div>
        Transaction by Source
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transSource.data.map((row) => (
              <TableRow
                key={row.source}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.source}
                </TableCell>
                <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex gap-10">
        <div>Total Amount:{transSource.total.toFixed(2)}</div>
        <div>Count:{transSource.count}</div>
        <div>Max Amount:{transSource.max.toFixed(2)}</div>
        <div>Min Amount:{transSource.min.toFixed(2)}</div>
      </div>
    </div>
  );
} else {
  return <div>Transaction by Source</div>;
}
}

export default TransTableSource