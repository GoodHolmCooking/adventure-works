import React, { useState, useEffect} from "react";
import Employee from "../Employee/employee";
//import PropTypes from "prop-types";
import EditEmployee from '../editEmployee'
import Modal from "react-modal";
import styles from "./employees.module.css";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter, deleteEmployeeAsync, loadEmployeesAsync, setFilter } from "../../store/slices/employeeSlice";
import searchButtons from "../../images/search.png";
import close from "../../images/close.png"

function Employees(props) {
//made objects for operations
	//axios objects
	//const inputRef = useRef(null);
	const dispatch = useDispatch();
	const {employees} = useSelector(state => state.employees)
	const {displayEmployees} = useSelector(state => state.displayEmployees)
	//edit object
	const [editEmployee,setEditEmployee] = useState(null);

//axios/api stuff

	useEffect(() => {
		if(!employees.length)
		{
			dispatch(loadEmployeesAsync());
		}
		
	},[dispatch,employees])
	
	useEffect(() => {
		if(employees.length)
		{
			dispatch(applyFilter(employees));
		}
		
		},[dispatch,employees])

	//modal stuff
	const handleOpenEditEmployee = (emp) =>
	{
		setEditEmployee(emp);
	}

	const handleCloseEditEmployee = () =>
	{
		setEditEmployee(null);
	}

	let editModal = null;

	if(editEmployee)
	{
		Modal.setAppElement('body');
		editModal = (
			<>
			<Modal className="modal " isOpen={true}>
        			<EditEmployee id={editEmployee.employeeId}></EditEmployee>
					<button className={styles.closeButton} onClick={() => 
					{
						handleCloseEditEmployee();
					}}><img src={close} alt="close" ></img></button>
    			</Modal>
			</>
		)
	}

	const checkIfNull = (val) => 
	{
		if(val === null)
		{
			return ""
		}
		else 
		{
			return val;
		}
	}
//view return 
	return (
    <div>
      <section className={styles.header} >
        <h1>Employees</h1>
		<div>
		<button>
			<div className={styles.circleOne}>
				<div className={styles.circleTwo}>

				</div>
			</div>
          <p className={styles.buttonText} >Overview</p>
        </button>
		<section className={styles.searchbar}>
			<input type="text"
			onChange={evt => dispatch(setFilter(evt.target.value))}
			>
			</input>
			<button onClick={() => dispatch(applyFilter(employees))}> <img src={searchButtons} alt="search"></img> </button>
		</section>
		</div>
      </section>
		<section className={styles.employee}>
			{/* table top */}
			<p>Employee</p>
			<p>Shifts</p>
			<p>Job Title</p>
			<p>department</p>
			<p>Employee ID</p>
			<p>Start Date</p>
			<p>Options</p>
		</section>
	  <section>
        {
		displayEmployees.map((employee) => (
          <Employee
            // top level information
            key={employee.employeeId}
            firstName={employee.firstName}
			lastName={employee.lastName}
            title= {checkIfNull(employee.title)}
            id={employee.employeeId}
            //employment information
            department={checkIfNull(employee.department)}
            shift={checkIfNull(employee.shift)}
            start={checkIfNull(employee.hireDate)}
            //buttons for editing or deleting the employee
            edit={() => {
              handleOpenEditEmployee(employee);
            }}
            delete={() => {
				dispatch(deleteEmployeeAsync(employee))
			}}
          ></Employee>
        ))}
        {editModal}
      </section>
    </div>
  );
}

export default Employees;