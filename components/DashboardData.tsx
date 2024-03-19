"use client";
import React, { useState } from 'react'

async function fetchExpenseByCategory({startDate,endDate}) {
  const resp = await fetch(
    `http://127.0.0.1:8000/statistics_by_category?startDate=${startDate}&endDate=${endDate}`,
    { cache: "no-cache" }
  );
  const data = await resp.json();
  return data;
}
async function fetchExpenseByDate({startDate,endDate}) {
  let by = "quarter";
  const resp = await fetch(
    `http://127.0.0.1:8000/statistics_by_date?startDate=${startDate}&endDate=${endDate}&by=${by}`,
    { cache: "no-cache" }
  );
  const data = await resp.json();
  return data;
}

const DashboardData = async() => {

  const [data, setData] = useState();
  const resp = await fetchExpenseByCategory(startDate,endDate);
  const resdate = await fetchExpenseByDate(startDate,endDate);
  const res = resp.data.map((items) => ({
    category: items.category,
    amount: items.amount* -1,
  }));
  return (
    <div>
      asdfasdfsdf
    </div>
    // res
  )
}

export default DashboardData