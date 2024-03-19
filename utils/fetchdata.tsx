import React from 'react'

const FetchData = async()=>{
    const resp = await fetch('http://127.0.0.1:8000/transaction',{cache:'no-cache'});
    const result = await resp.json();
    return result; 
}

export default FetchData