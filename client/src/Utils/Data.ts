
type ProjectData = {
  projectName: string;
  assignee: string;
  progress: number;
}
type Employee = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};


function getRandomInt(min:number, max:number):number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomProjectName(): string {
  const projectNames: string[] = ["Project A", "Project B", "Project C", "Project D", "Project E"];
  return projectNames[Math.floor(Math.random() * projectNames.length)];
}

function getRandomStatus():string {
  const statuses:string[] = ["Married", "Single", "Divorced", "Widowed"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}
function getRandomFirstName() :string{
  const firstNames:string[] = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "James", "Emma", "Robert", "Olivia"];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function getRandomLastName():string {
  const lastNames:string[] = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}
//  Genetates the data for the projects
function generateRandomProjectData(): ProjectData {
  return {
    projectName: getRandomProjectName(),
    assignee: getRandomFirstName() + " " + getRandomLastName(), // Combining first and last names for the assignee
    progress: getRandomInt(0, 100),
  };
}
// Generates the data for the employee
function generateRandomData():Employee {
  return {
    firstName: getRandomFirstName(),
    lastName: getRandomLastName(),
    age: getRandomInt(20, 60),
    visits: getRandomInt(50, 300), 
    progress: getRandomInt(0, 100),
    status: getRandomStatus(),
  };
}

function generateRandomDataArray(count:number) {
  const dataArray = [];
  for (let i = 0; i < count; i++) {
    dataArray.push(generateRandomData());
  }
  return dataArray;
}

function generateRandomProjectDataArray(count: number): any[] {
  const projectDataArray = [];
  for (let i = 0; i < count; i++) {
    projectDataArray.push(generateRandomProjectData());
  }
  return projectDataArray;
}

const additionalProjectData = generateRandomProjectDataArray(10);
const additionalData = generateRandomDataArray(100);

export const EMPLOYEE_DATA = [
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  },
  ...additionalData
];

export const PROJECT_DATA = [
  {
    projectName: "Project X",
    assignee: "John Doe",
    progress: 50,
  },
  {
    projectName: "Project Y",
    assignee: "Jane Smith",
    progress: 80,
  },
  ...additionalProjectData,
];
