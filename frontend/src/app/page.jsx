import toast, { Toaster } from 'react-hot-toast';
import React from "react";
import JobList from "@/app/components/jobList"; // Adjust path based on your project setup
import CreateJob from "@/app/components/createJob";
import { DynamicProvider } from "@/context/context";

const Home = () => {
  return (
    <main>
      <DynamicProvider>
      <div className="flex-col-1 md:flex p-6 gap-5">
        <div className="lg:w-[30%] md:w-1/2 xl:w-[25%] flex justify-center items-center shadow-sm md:pb-0 pb-10 border-2 rounded-lg">
          <CreateJob />
        </div>
        <div className="lg:w-[70%] md:w-1/2 xl:w-[75%] rounded-lg border-2 p-3 md:min-h-[40rem] shadow-md md:mt-0 mt-10">
          <JobList />
        </div>
        <Toaster toastOptions={{duration:2000}}/>
      </div>
      </DynamicProvider>
    </main>
  );
};

export default Home;
