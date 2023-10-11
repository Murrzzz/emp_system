import { prisma } from "@/db";
import { File } from "buffer";
import { profile } from "console";
import { writeFile } from "fs/promises";
import  Link  from "next/link";
import { redirect } from "next/navigation";
import { join } from "path";

async function addEmp(data: FormData) {
    "use server"

    //taking the image
        const file: File | null = data.get('file') as unknown as File

        if(!file){
            throw new Error('No file uploaded')
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join('public/', file.name)
        const profile = join('/', file.name)
        await writeFile(path, buffer)
        console.log('open ${path} to see the upload file')
         

// taking the fields
       const emp_name = data.get("emp_name")?.valueOf()
       const emp_position = data.get("emp_position")?.valueOf()
       const emp_age = data.get("emp_age")?.valueOf()
       const emp_sex = data.get("emp_sex")?.valueOf()
   
       if (typeof profile !=="string"||typeof emp_name !== "string" || typeof emp_position !== "string" || typeof emp_age !== "string" || typeof emp_sex !== "string") {
           throw new Error("Invalid Name");
       }
// inutting into database
        await prisma.emp_db.create({ data: { emp_name: emp_name, emp_position: emp_position, emp_age: 33, emp_gender :emp_sex, emp_profile: profile
        }
        })
       
      //await prisma.emp_db.create({data: { emp_name: "sample", emp_position:"manager", emp_age: 33, emp_gender: "male", emp_profile:"path"}})
       redirect("/")
   }

export default function page() {
    
    return(
        <>  
            <div className="py-10 px-8 max-w-sm mx-auto my-10 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">

            <form action={addEmp} className="flex flex-col  w-100 grow gap-2 p-8">
            <h1 className="uppercase">Add Employee</h1>
                <input placeholder="Fullname" name="emp_name" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                <input placeholder="Position" name="emp_position" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                <input placeholder="Age" name="emp_age" type="number" min='18' max='70' className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                <select placeholder="Sex" name="emp_sex" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100" >
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>

                <input type="file" name="file" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"/>
                <button type="submit" className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Add</button>
            </form>
            </div>        
  
        </>

    )
}