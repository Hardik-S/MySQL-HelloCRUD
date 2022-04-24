// import dependencies including axios for API requests
import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
        // simple state variables and hooks
        const [name, setName] = useState('Rythm');
        const [age, setAge] = useState(18);
        const [country, setCountry] = useState('Canada');
        const [position, setPosition] = useState('CEO');
        const [wage, setWage] = useState(0);
        const [startdate, setstartdate] = useState('01/01/1970');

        // complex state hooks
        const [newWage, setNewWage] = useState(0);

        // saves database as array upon axios request to mySQL workbench
        const [employeeList, setEmployeeList] = useState([]);

        // addEmployee function
        const addEmployee = () => {
                // create object using post request
                Axios.post('http://localhost:3001/create', {
                        // object properties, assign keys: values
                        name: name,
                        age: age,
                        country: country,
                        position: position,
                        wage: wage,
                        startdate: startdate
                }).then(() => {
                        // force synchronous function such that data exists in db before manipulation
                        setEmployeeList([
                                ...employeeList,
                                {
                                        name: name,
                                        age: age,
                                        country: country,
                                        position: position,
                                        wage: wage,
                                        startdate: startdate
                                }
                        ]);
                });
        };

        // getEmployees function
        const getEmployees = () => {
                // fetch mySQL database data using axios get request
                Axios.get('http://localhost:3001/employees')
                        // force synchronous, upon getting employees - set response data
                        .then((response) => {
                                // set the employee list as the data retrieved from the database
                                setEmployeeList(response.data);
                        });
        };

        // update employee salary
        const updateEmployeeWage = (id) => {
                Axios.put('http://localhost:3001/update', {
                        wage: newWage,
                        id: id
                }).then((response) => {
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
                                                          startdate: val.startdate
                                                  }
                                                : val;
                                })
                        );
                });
        };

        const deleteEmployee = (id) => {
                Axios.delete(`http://localhost:3001/delete/${id}`).then(
                        (response) => {
				console.log(id);
                                setEmployeeList(
					
                                        employeeList.filter((val) => {
                                                return val.id !== id;
                                        })
                                );
                        }
                );
        };

        const displayInfo = () => {
                console.log(
                        'name: ' +
                                name +
                                '\nage: ' +
                                age +
                                '\ncountry: ' +
                                country +
                                '\nposition: ' +
                                position +
                                '\nwage: ' +
                                wage +
                                '\nstartdate: ' +
                                startdate
                );
        };

        return (
                <div className="App" class="fullscreen">
                        <div className="information">
                                <label>Name:</label>
                                <input
                                        type="text"
                                        // onKeyUp={
                                        //         this.value < 0
                                        //                 ? (this.value =
                                        //                           this.value *
                                        //                           -1)
                                        //                 : (this.value =
                                        //                           this.value)
                                        // }
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
                                <label>Startdate:</label>
                                <input
                                        type="text"
                                        onChange={(event) => {
                                                setstartdate(
                                                        event.target.value
                                                );
                                        }}
                                />

                                <button class="button" onClick={addEmployee}>
                                        <span>Add Employee </span>
                                </button>
                        </div>

                        <div className="employees">
                                <button class="button" onClick={displayInfo}>
                                        <span>Console Log Display Info </span>
                                </button>

                                <button class="button" onClick={getEmployees}>
                                        <span>Show Employees </span>
                                </button>

				{/* rendering employee list by mapping it using key value pairs */}
                                {employeeList.map((val, key) => {
                                        return (
                                                // note classname `employee` without the pluralizing `s`
                                                <div className="employee">
                                                        <div > 
                                                                <h3>
                                                                        Name:{' '}
                                                                        {
                                                                                val.name
                                                                        }
                                                                </h3>
                                                                <h3>
                                                                        Age:{' '}
                                                                        {
                                                                                val.age
                                                                        }
                                                                </h3>
                                                                <h3>
                                                                        Country:{' '}
                                                                        {
                                                                                val.country
                                                                        }
                                                                </h3>
                                                                <h3>
                                                                        Position:{' '}
                                                                        {
                                                                                val.position
                                                                        }
                                                                </h3>
                                                                <h3>
                                                                        Wage:{' '}
                                                                        {
                                                                                val.wage
                                                                        }
                                                                </h3>
                                                                <h3>
                                                                        Startdate:{' '}
                                                                        {
                                                                                val.startdate
                                                                        }
                                                                </h3>
                                                        </div>
                                                        <div>
                                                                <input
                                                                        type="text"
                                                                        placeholder=""
                                                                        onChange={(
                                                                                event
                                                                        ) => {
                                                                                setNewWage(
                                                                                        event
                                                                                                .target
                                                                                                .value
                                                                                );
                                                                        }}
                                                                />
                                                                <button
                                                                        class="button"
                                                                        onClick={() => {
                                                                                updateEmployeeWage(
                                                                                        val.id
                                                                                );
                                                                        }}
                                                                >
                                                                        {' '}
                                                                        <span>
                                                                                Update{' '}
                                                                        </span>
                                                                </button>

                                                                <button
                                                                        class="button"
                                                                        onClick={() => {
										console.log(val);
										console.log(val.id);
                                                                                deleteEmployee(
                                                                                        val.id
                                                                                );
                                                                        }}
                                                                >
                                                                        <span>
                                                                                Delete{' '}
                                                                        </span>
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
