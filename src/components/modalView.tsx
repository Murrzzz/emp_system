import { type } from "os";
import React from "react";

type ModalViewProps = {
  id: string
  emp_name: string
  emp_position: string
  emp_age: number
  emp_gender: string
  emp_profile: string
}


export default function ModalView({ id, emp_name, emp_position, emp_age, emp_gender, emp_profile }: ModalViewProps) {
  const [showModal, setShowModal] = React.useState(false);

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
            <form className="relative w-auto my-6 mx-auto max-w-3xl">
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
                        Profile: <img src={emp_profile} alt="" className="object-contain h-48 w-96 "/>
                      </label>
                      <label className="flex cursor-pointer items-center justify-between p-1">
                        Fullname: <h1>{emp_name}</h1>
                      </label>
                      <label className="flex cursor-pointer items-center justify-between p-1">
                        Position: <h1>{emp_position}</h1>
                      </label>
                      <label className="flex cursor-pointer items-center justify-between p-1">
                        Gender <h1>{emp_gender}</h1>
                      </label>
                      <label className="flex cursor-pointer items-center justify-between p-1">
                        Age: <h1>{emp_age}</h1>
                      </label>
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