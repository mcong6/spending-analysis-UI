import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicBars from "@/utils/barchart";

const TransTableCategory = (activatePeriod) => {
  const [transCategory, setTransCategory] = useState(null);

  const FetchTransCategoryData = async () => {
    const res = await fetch(
      `http://localhost:8000/statistics_by_category?startDate=2023-01-01&endDate=2023-02-01`
    );
    const data = await res.json();
    setTransCategory(data);
  };

  useEffect(() => {
    FetchTransCategoryData();
  }, [activatePeriod]);

  if (transCategory) {
    return (
      <div>
        <div>Transaction by Category</div>
        <div>
          <BasicBars dataSet={transCategory.data} datakey={'category'}/>
        </div>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transCategory.data.map((row) => (
                <TableRow
                  key={row.category}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.category}
                  </TableCell>
                  <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex gap-10">
          <div>Total Amount:{transCategory.total.toFixed(2)}</div>
          <div>Count:{transCategory.count}</div>
          <div>Max Amount:{transCategory.max.toFixed(2)}</div>
          <div>Min Amount:{transCategory.min.toFixed(2)}</div>
        </div>
      </div>
    );
  } else {
    return <div>Transaction by Category</div>;
  }
};

export default TransTableCategory;
