import React, { useState,useEffect } from "react";
import axios from "axios";
import { createColumnHelper, getCoreRowModel, useReactTable,flexRender } from "@tanstack/react-table";
import { EMPLOYEE_DATA } from "../Utils/Data";
import toast from "react-hot-toast";

function Rerender(){
  toast.success("Hi")
  window.location.reload();
}

type User = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

// Code to use Later
// function fetcher(){
//   // const [items,setItems]=useState()
//   useEffect(() => {
//     const fetchItems = async () => {
//       const response = await axios.get('https://api.example.com/items');
//       setItems(response.data);
//     };
//
//     fetchItems();
//   }, []);
// }
// Code to be used Later ends here
const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.accessor("firstName", {
    header:()=><span>First Name</span>,
    cell: (info) => info.getValue(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    // footer: (info) => info.column.id,
  }),
  // columnHelper.accessor("progress", {
    // header: "Profile Progress",
    // footer: (info) => info.column.id,
  // }),
];

const EmployeesTab: React.FC = () => {
  // const Data:User[]=
  const [data, setData] = useState<User[]>(()=>[...EMPLOYEE_DATA]);
  
  
  const table = useReactTable({ data,columns,getCoreRowModel:getCoreRowModel() });
  return (
    <div className="w-full text-black dark:text-white flex flex-col p-2">
      <div className="flex justify-between items-center gap-2">
      <h1 className={`text-4xl py-2 font-bold text-yellow-500`}>Employees</h1>
      <div className="py-4 ">
      <button  onClick={() =>Rerender()} className=" hover:bg-yellow-500 hover:text-black transition duration-200 border w-32 p-2">
        Rerender
      </button>
      <button className="hover:bg-green-500 hover:text-black transition duration-200 border w-32 p-2">
        Excel
      </button>
      </div>
      </div>
      <table className=" w-full">
        <thead className="">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className="border border-yellow-500 "  key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody >
          {/* This is the row of the table */}
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td className="border-neutral-700 border text-center" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      
    </div>
  )
};

export default EmployeesTab;
