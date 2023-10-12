

import { EmpTable } from "@/components/EmpTable";
import ModalAdd from "@/components/modalAdd";
import ModalEdit from "@/components/modalView";
import { prisma } from "@/db";
import { writeFile } from "fs/promises";
import { File } from "buffer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { join } from "path";
import { stringify } from "querystring";

async function deleteItem(id:string) {
    "use server"
    const deleteUser = await prisma.emp_db.delete({
        where: {
            id: id,
        },
      })
      redirect('/')
      
}

async function updateItem(id:string, name:string, position:string, age:string, sex:string, file:string) {
    "use server"

    await prisma.emp_db.updateMany({
        where: {
          id: {
            contains: id,
          },
        },
        data: {
          emp_name: name,
          emp_position: position,
          emp_age: age,
          emp_gender: sex,
          emp_profile: file,
        },
      })
      redirect('/')
}
async function emp_add(emp_file:string, emp_names:string, emp_positions:string, emp_ages:string, emp_sexs:string ) {
    "use server"

    //taking the image
        const file: File | null = emp_file as unknown as File

        if(!emp_file){
            throw new Error('No file uploaded')
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join('public/', file.name)
        const profile = join('/', file.name)
        await writeFile(path, buffer)
        console.log('open ${path} to see the upload file')
         

// inutting into database
        await prisma.emp_db.create({ data: { emp_name: emp_names, emp_position: emp_positions, emp_age: emp_ages, emp_gender :emp_sexs, emp_profile: emp_file
        }
        })
       
      //await prisma.emp_db.create({data: { emp_name: "sample", emp_position:"manager", emp_age: 33, emp_gender: "male", emp_profile:"path"}})
      // redirect("/")
   }
export default async function Home() {
    const emp_db = await prisma.emp_db.findMany()
  return (
          <>
          
            <div className="relative mx-10 mt-10 overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="flex justify-center text-2xl mx-auto my-auto over">Employee List</h1>
                <ModalAdd emp_add={emp_add}/>
              <Link href='/addNew' className="inline-block mx-6 cursor-pointer rounded-md bg-gray-700 px-4 py-3 text-center text-sm font-semibold  text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Add</Link>          
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Employee Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Gender
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emp_db.map(emp_db => (
                          <EmpTable {...emp_db} updateItem={updateItem} deleteItem={deleteItem} />
                        ))}

                        
                    </tbody>
                </table>
            </div>
            
          </>
  )
}
function sanitize(file: string) {
    throw new Error("Function not implemented.");
}

