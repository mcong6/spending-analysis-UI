'use client';
import React, { useEffect, useState } from "react";
import TransactionsTable from "./TransactionsTable";
import FetchTransByDate from "./FetchTransByDate";

const DashboardTransactionsTable = (period) => {
  const [res, setRes] = useState(null)
  const setTransData=async()=>{
    const data = await FetchTransByDate(period);
    setRes(data);
  }
  useEffect(() => {
    setTransData();
  }, [period]);

  return (
    <div>
      {res && <TransactionsTable rows={res} />}
    </div>
  );
};

export default DashboardTransactionsTable;
