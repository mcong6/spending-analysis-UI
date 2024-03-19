"use client";
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import DashboardTransactionsTable from './DashboardTransactionsTable';
import TransTableCategory from './TransTableCategory';
import TransTableSource from './TransTableSource';
import TransTableAmount from './TransTableAmount';
import BasicBars from '@/utils/barchart';


const DashboardInput = () => {
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-01")
  const [activatePeriod, setActivatePeriod] = useState('1Yr');  

  
  return (
    <div>
      <div className='flex gap-3 ml-16 pt-3'>
      <Button variant="contained" onClick={()=>{setActivatePeriod("1Mo")}}>1Mo</Button>
      <Button variant="contained" onClick={()=>{setActivatePeriod("3Mo")}}>3Mo</Button>
      <Button variant="contained" onClick={()=>{setActivatePeriod("6Mo")}}>6Mo</Button>
      <Button variant="contained" onClick={()=>{setActivatePeriod("1Yr")}}>1Yr</Button>
      <Button variant="contained" onClick={()=>{setActivatePeriod("3Yr")}}>3Yr</Button>
      <Button variant="contained" onClick={()=>{setActivatePeriod("5Yr")}}>5Yr</Button>
      <Button variant="contained" onClick={()=>{setActivatePeriod("All")}}>All</Button>
      </div>
      
      <div>
        <TransTableAmount period={activatePeriod}/>
      </div>
      <div>
        <TransTableSource period={activatePeriod}/>
      </div>
      <div>
        <TransTableCategory period={activatePeriod}/>
      </div>
      <div>
      <DashboardTransactionsTable period={activatePeriod}/>
      </div>
      {/* <div>DashboardInput</div> */}
    </div>

  )
}

export default DashboardInput