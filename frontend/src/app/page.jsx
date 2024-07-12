// src/app/page.js

import React from "react";
import JobList from "@/components/JobList"; // Adjust path based on your project setup
import CreateJob from "@/components/CreateJob";

const Home = () => {
  return (
    <main>
      <div className="flex-col-1 md:flex p-6 gap-5">
        <div className="lg:w-[30%] md:w-1/2 xl:w-[25%] flex justify-center items-center shadow-sm md:pb-0 pb-10 border-2 rounded-lg">
          <CreateJob />
        </div>
        <div className="lg:w-[70%] md:w-1/2 xl:w-[75%] rounded-lg border-2 p-3 md:min-h-[40rem] shadow-md md:mt-0 mt-10">
          <JobList />
        </div>
      </div>
    </main>
  );
};

export default Home;
