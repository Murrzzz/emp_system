
"use client"

import { prisma } from "@/db"
import ModalView from "./modalView"
import ModalDelete from "./modalDelete"


type EmpTableProps = {
    id: string
    emp_name: string
    emp_position: string
    emp_age: number
    emp_gender: string
    emp_profile: string
    deleteItem:(id:string) =>void
} 
export function EmpTable({ id,emp_name,emp_position,emp_age,emp_gender,deleteItem,emp_profile}:EmpTableProps) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
        {emp_name}
        </th>
        {EmpTable.length === 0 && "No records!"}
        <td className="px-6 py-4">{emp_position}</td>
        <td className="px-6 py-4">{emp_age}</td>
        <td className="px-6 py-4">{emp_gender}</td>
        <td className="px-6 py-4">

        
          <ModalView key={id} id={id} emp_profile={emp_profile} emp_name={emp_name} emp_position={emp_position} emp_age={emp_age} emp_gender={emp_gender} {...EmpTable}/>
          <ModalDelete key={id} id={id} emp_profile={emp_profile} emp_name={emp_name} deleteItem={deleteItem} emp_position={emp_position} emp_age={emp_age} emp_gender={emp_gender} {...EmpTable}/>

        </td>
      </tr>
    </>
  )
}
