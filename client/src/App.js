import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {

  // simple state variables and hooks
  const [name, setName] = useState("Rythm");
  const [age, setAge] = useState(18);
  const [country, setCountry] = useState("Canada");
  const [position, setPosition] = useState("CEO");
  const [wage, setWage] = useState(0);
  const [birthdate, setBirthdate] = useState("01/01/1970");

  // complex state hooks
  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  // addEmployee function
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
      birthdate: birthdate,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
          birthdate: birthdate,
        },
      ]);
    });
  };

  // getEmployees function
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                  birthdate: val.birthdate,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const displayInfo = () => {
    console.log("name: " + name + "\nage: " + age + "\ncountry: " + country + "\nposition: " + position + "\nwage: " + wage + "\nbirthdate: " + birthdate);
  };

  return (
    <div className="App" class = "fullscreen">
      <div className="information">

        <label>Name:</label>
        <input
          type="text" 
          onKeyUp="if(this.value<0){this.value= this.value * -1}"
          min="15"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />

        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />

        <label>Wage (year):</label>
        <input
          type="number"
          min="0"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <label>Birthdate:</label>
        <input
          type="text"
          onChange={(event) => {
            setBirthdate(event.target.value);
          }}
        />    

        <button class = "button" 
        onClick={addEmployee}>
          <span>Add Employee       </span></button>
      
      </div>

      <div className="employees">
      <button class = "button" 
        onClick={displayInfo}>
          <span>Console Log Display Info       </span></button>
        <button class = "button" 
        onClick={getEmployees}>
          <span>Show Employees       </span></button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
                <h3>Birthdate: {val.birthdate}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
