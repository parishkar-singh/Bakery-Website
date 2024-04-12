import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { PROJECT_DATA } from "../Utils/Data";

function Rerender() {
  window.location.reload();
}

type ProjectData = {
  projectName: string;
  assignee: string;
  progress: number;
};
// Code to use Later
function fetcher() {
  const [items, setItems] = useState();
  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("https://api.example.com/items");
      setItems(response.data);
    };

    fetchItems();
  }, []);
}
// Code to be used Later ends here
const columnHelper = createColumnHelper<ProjectData>();
const columns = [
  columnHelper.accessor("projectName", {
    header: () => <span>Project</span>,
    cell: (info) => info.getValue(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.assignee, {
    id: "assignee",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Owner</span>,
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: () => "Progress",

    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
];

const ProjectsTab: React.FC = () => {
  // const Data:User[]=
  const [data, setData] = useState<ProjectData[]>(() => [...PROJECT_DATA]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full text-black dark:text-white flex flex-col p-2">
      <div className="flex justify-between items-center gap-2">
        <h1 className={`text-4xl py-2 font-bold text-blue-500`}>Projects</h1>
        <div className="py-4 text-black dark:text-white ">
          <button
            onClick={() => Rerender()}
            className="hover:bg-blue-500 dark:hover:bg-white hover:text-black transition duration-200 border w-32 p-2">
            Rerender
          </button>
          <button className="hover:bg-green-500 hover:text-black transition duration-200 border w-32 p-2">
            Excel
          </button>
        </div>
      </div>
      <table className={` w-full`} >
        <thead className=" border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="border border-blue-500" key={header.id}>
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
        <tbody>
          {/* This is the row of the table */}
          {table.getRowModel().rows.map((row) => (
            <tr  key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const cellValue = cell.getContext().getValue();
                const isNumber = !isNaN(Number(cellValue));
                const widthPercentage = isNumber ? `${cellValue}%` : "100%";
                let backgroundColorClass = "";
                if (isNumber) {
                  const numericValue = parseFloat(cellValue as string);
                  if (numericValue < 33) backgroundColorClass = "bg-red-500";
                  else if (numericValue >= 34 && numericValue < 66) backgroundColorClass = "bg-yellow-500";
                  else if(numericValue===100) backgroundColorClass='bg-blue-500'
                  else backgroundColorClass = "bg-green-500";
                
                  return (
                    <td
                      className={`relative border-neutral-700 border text-center`}
                      key={cell.id}
                    >
                      {/*  Colored Progress bar inside the progress cell */}
                      <div
                        className={` ${backgroundColorClass} mix-blend-multiply dark:mix-blend-screen h-full absolute top-0 left-0 z-0`}
                        style={{ width: widthPercentage }}
                      ></div>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      %
                    </td>
                  );
                } else {
                  return (
                    <td
                      className={`border-neutral-700 border text-center`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
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
  );
};

export default ProjectsTab;
