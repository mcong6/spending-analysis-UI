"use client";
import TransactionsTable from "@/components/TransactionsTable";
import FetchData from "@/utils/fetchdata";
import useSWR from "swr";

export const page = () => {
  const { data: res, isLoading, error } = useSWR("/transaction", FetchData);
  if (isLoading) {
    return <div className="flex justify-center pt-36">loading...</div>;
  }
  return (
    <div>
      <TransactionsTable rows={res} />
    </div>
  );
};
export default page;
