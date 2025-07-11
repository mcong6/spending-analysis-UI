import Link from "next/link";
import CustomButton from "@/components/CustomButton"; // Import the CustomButton

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
            Unlock Your Financial Insights
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Take control of your spending with our intuitive analysis tool. Upload your transactions, visualize your habits, and make smarter financial decisions.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/dashboard" passHref>
            <CustomButton
              title="Get Started"
              variant="contained"
              color="primary"
              size="large"
              className="w-full sm:w-auto py-3 px-6 rounded-md shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </Link>
          <Link href="/transactions/add_transactions" passHref>
            <CustomButton
              title="Upload Transactions"
              variant="outlined"
              color="primary"
              size="large"
              className="w-full sm:w-auto py-3 px-6 rounded-md shadow-sm text-blue-600 border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
