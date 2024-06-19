import { useFormik } from "formik";
import React, { useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import circular from "../../assets/images/circular_loader.gif";
import Image from "next/image";
export default function FileUpload({ setIsFileUploaded }) {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      if (values.file) {
        formData.append("files", values.file);
      }

      try {
        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BE_URI}/upload/`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          alert("File uploaded successfully");
          setLoading(false);
          setIsFileUploaded(true); // Update state once file is uploaded
          console.log("File upload response:", uploadData);
        } else {
          console.error("Failed to upload files");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    },
  });

  return (
      <div className="bg-green-100 rounded-lg h-32 w-72 pb-10">
        <input
          type="file"
          id="file"
          name="file"
          onChange={(event) => {
            formik.setFieldValue("file", event.currentTarget.files[0]);
          }}
          className="hidden"
        />
        <h1 className="text-center text-lg">Upload your file here</h1>
        {formik.values.file ? (
          <div
            onClick={() => document.getElementById("file").click()}
            className="flex justify-center cursor-pointer hover:bg-green-100 mx-auto bg-white rounded-lg w-max px-5 py-1 mt-2"
          >
            <IoCheckmarkDoneCircleOutline size={25} />
            <h1 className="my-auto mx-10">File Selected</h1>
          </div>
        ) : (
          <div
            onClick={() => document.getElementById("file").click()}
            className="flex justify-center cursor-pointer hover:bg-green-100 mx-auto bg-white rounded-lg w-max px-5 py-1 mt-2"
          >
            <IoIosCloudUpload size={25} />
            <h1 className="my-auto mx-10">Select File</h1>
          </div>
        )}

        <button
          className="flex justify-center cursor-pointer hover:bg-green-100 bg-white mx-auto rounded-lg w-28 px-5 py-1 mt-2"
          onClick={formik.handleSubmit}
        >
          {loading ? (
            <Image src={circular} className="my-auto" height={25} width={25} />
          ) : (
            // <Image src={circular} className="my-auto" height={25} width={25} />
            <h1 className="my-auto mx-10">Upload</h1>
          )}
        </button>
      </div>
  );
}
