import React from 'react'

const FetchTransByDate = async({period})=>{
  let resp=null;
    if (period!='All'){
        resp = await fetch('http://127.0.0.1:8000/transaction'+`?period=${period}`,{cache:'no-cache'});
    }
    else{
        resp = await fetch('http://127.0.0.1:8000/transaction',{cache:'no-cache'});
    } 
    const result = await resp.json();
    return result; 
}

export default FetchTransByDate