'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Plotscard from "./plotscard";
import Plots from "./plots";
import Plotsbar from "./plotbar";
import Twopie from './2pie'

const CsvUploader = () => {
  const router = useRouter();
  const [csvUrls, setCsvUrls] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [user, setUser] = useState(null);
  const [plotData, setPlotData] = useState(null);
  const [showPlots, setShowPlots] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const uploadCsv = async (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lodrnpjl");
  };

  const handleAnalyse = async () => {
    const fileInput = document.getElementById("file"); // Assuming you have an input element for file upload with id 'file'
    const file = fileInput.files[0]; // Get the first file selected by the user
    const formData = new FormData();
    formData.append("file", file); // Append the file to the FormData object
    const url = "http://127.0.0.1:5000/upload"; // Update with your server URL
    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setPlotData(data); // Set the received data to the state variable
      setShowPlots(true); // Show the plots
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    gsap.set(".redball", { xPercent: -50, yPercent: -50 });
    let targets = gsap.utils.toArray(".redball");
    window.addEventListener("mouseleave", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        scale: 0,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
    window.addEventListener("mouseenter", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        scale: 1,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
    window.addEventListener("mousemove", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
  }, []);

  return (
    <>
      <div className="redball blur-3xl bg-red-400/50 w-96 h-96 fixed top-0 left-0 rounded-full"></div>
      <div className="mx-auto text-center text-7xl max-sm:text-5xl max-md:text-6xl font-bold mt-10">
        Ready to Analyze your <span className="redtext">"User Data"</span> ?
      </div>
      <p className="text-sm max-sm:text-xs text-gray-600 mt-4 mx-auto text-center">
        Upload your CSV file and let our AI do the magic
      </p>
      <div className="flex max-md:flex-col mx-auto justify-center mt-8 px-24 max-sm:px-4">
        <div className="w-full">
          <div className="w-fit max-md:w-11/12 p-8 max-sm:p-2 bg-red-100 border border-red-300 rounded-md h-fit max-h-min mx-auto mt-8 mb-8 flex-col items-center justify-center">
            <div className=" flex-col items-center justify-center"></div>
            <input
              type="file"
              id="file"
              accept=".csv"
              onChange={uploadCsv}
              className="sr-only"
            />
            <label
              htmlFor="file"
              className="items-center cursor-pointer border border-gray-800 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out block mx-auto"
            >
              Upload CSV
            </label>
            {fileName && <p className="mt-5">File Uploaded: {fileName}</p>}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleAnalyse}
          className="items-center bg-red-600 text-white px-4 py-2 m-3 rounded-md hover:bg-red-800 transition duration-300 ease-in-out"
        >
          Analyze
        </button>
      </div>
      {showPlots && (
        <Plotscard plotData={plotData} />
      )}
      {showPlots && (

        <div className="flex rounded-3xl  p-5 text-center justify-center">

          <div className="  w-1/2 mx-2">
            
            {showPlots && <Plots plotData={plotData} />}
          </div>
          <div className="w-1/2">

          {showPlots && <Plotsbar plotData={plotData} />}
          </div>
         
        </div>
      )}
     
    </>
  );
};

export default CsvUploader;
