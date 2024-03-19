import React from "react";

const postData = async ({ data }) => {
  console.log("asdfasdfasdfasdfasdfasdf");
  console.log(JSON.stringify(data));
  const resp = await fetch("http://127.0.0.1:8000/transaction", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });
  const result = await resp.json();

  return result;
};

export default postData;
