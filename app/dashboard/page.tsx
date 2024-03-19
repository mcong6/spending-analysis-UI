import DashboardData from "@/components/DashboardData";
import DashboardInput from "@/components/DashboardInput";
import DoughnutChart from "@/components/DoughnutChart";


const dashboard = async () => {
  // const data = DashboardData();

  return (
    <div>
      <DashboardInput/>
      
      {/* <DashboardData/> */}
      {/* <DoughnutChart data={data} /> */}

      {/* <pre>{JSON.stringify(res.data, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(resdate, null, 2)}</pre> */}
    </div>
  );
};

export default dashboard;
