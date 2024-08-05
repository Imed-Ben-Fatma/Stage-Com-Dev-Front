'use client';

import React, { useState } from 'react';

export default  function UploadSection() {
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    const filePreviews = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        filePreviews.push({ name: file.name, src: e.target.result });
        if (filePreviews.length === selectedFiles.length) {
          setImagePreviews(filePreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <section className="container items-center ">
      <div className=" bg-white rounded-lg shadow-md overflow-hidden items-center">
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className=" p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
            onClick={() => document.getElementById('upload').click()}
          >
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <label htmlFor="upload" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-700 mx-auto mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                Upload pictures
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                Choose photos. Each photo size should be less than <b className="text-gray-600">2mb</b>
              </p>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.
              </p>
            </label>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 ">
              {imagePreviews.map((preview, index) => (
                <div key={index}>
                  <img
                    src={preview.src}
                    alt={preview.name}
                    className="max-h-48 rounded-lg mx-auto mb-2"
                  />
                  <span className="text-gray-500 bg-gray-200">{preview.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center" onClick={() => document.getElementById('upload').click()}>
            <div className="w-full">
              <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                <span className="text-center ml-2" >Upload</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
