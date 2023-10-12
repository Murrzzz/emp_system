import { prisma } from "@/db";
import { File } from "buffer";

import { redirect } from "next/dist/server/api-utils";
import { type } from "os";
import { join } from "path";
import React, { useState } from "react";

type ModalViewProps = {
  id: string
  emp_name: string
  emp_position: string
  emp_age: string
  emp_gender: string
  emp_profile: string
  updateItem:(id:string, name:string, position:string, age:string, sex:string, file:string)=>void
}


export default function ModalView({ id, emp_name, emp_position, emp_age, emp_gender, emp_profile, updateItem }: ModalViewProps ,{data}:{data:FormData}) {
  const [showModal, setShowModal] = React.useState(false);


  const [emp_id, setEmpt_id] = React.useState(id)
  const [name, setName] = React.useState(emp_name)
  const [position, setPosiion] = React.useState(emp_position)
  const [age, setAge] = React.useState(emp_age)
  const [sex, setSex] = React.useState(emp_gender)
  const [file, setFile] = React.useState(emp_profile)
  const [filebase64,setFileBase64] = useState<string>(emp_profile)

  // The Magic all happens here.
  function convertFile(files: FileList|null) {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      console.log("This file upload is of type:",fileType)
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }
  
 function handleSubmit(e: any) {
  e.preventDefault()
    updateItem(emp_id,name,position,age,sex,filebase64)

    console.log({filebase64})
    window.location.href = "";  

  }

  return (
    <>
      <button
        className="inline-block mx-6 cursor-pointer rounded-md bg-yellow-700 px-4 py-3 text-center text-sm font-semibold  text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
        type="button"
        onClick={() => setShowModal(true)}
      >
        View
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <form onSubmit={handleSubmit} className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Employee
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="w-auto rounded-2xl bg-white">
                  <div className="flex flex-col gap-2 p-8">

                      <label className="flex cursor-pointer items-center justify-between p-1">
                        Profile: <img src={filebase64} width={300} />
                      </label>
                      <input placeholder={emp_id} value={filebase64} type="hidden" name="id" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                      <input type="file" name="files" placeholder={file} onChange={(e)=> convertFile(e.target.files)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                      <input placeholder={name} value={name} name="emp_name"onChange={e => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                      <input placeholder={position} value={position} name="emp_position"onChange={e => setPosiion(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                      <input placeholder={age} value={age}type="number"onChange={e => setAge(e.target.value)} name="emp_age"className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                      <select placeholder={sex}value={sex} name="emp_sex"  onChange={e => setSex(e.target.value)}className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100" >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      </select>

                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}