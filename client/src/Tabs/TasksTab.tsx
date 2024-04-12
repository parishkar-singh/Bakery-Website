import Task from "../Components/Task/Task";

const DropDownMenu:React.FC = () => {
  return (
    <select className="bg-black flex w-32 px-2 py-1 border-2  outline-none  ">
      <option value="Project-X">Project-X</option>
      <option value="Project-Y">Project-Y</option>
      <option value="Project-Z">Project-Z</option>
      <option value="Project-A">Project-A</option>
    </select>
  );
};
const TaskStatus:React.FC=()=>{
    const staticClasses="border-2 p-2 gap-2 flex flex-col rounded-3xl";
    return(
        <div className=" grid grid-cols-3 gap-3 w-full h-[80%]">
            <div className={`border-red-500 ${staticClasses}`} >
                <Task/>
            </div>
            <div className={`border-yellow-500 ${staticClasses}`}>
            <Task/><Task/><Task/>
            </div>
            <div className={`border-green-500 ${staticClasses}`}>
            <Task/><Task/>
            </div>
        </div>
    )
}


const TaskTab = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 p-2">
        <div className="flex items-center justify-between ">
      <h1 className={`text-4xl  font-bold text-green-500`}>Task's</h1>
      <DropDownMenu/>
        </div>
      <TaskStatus/>
    </div>
  );
};
export default TaskTab;
