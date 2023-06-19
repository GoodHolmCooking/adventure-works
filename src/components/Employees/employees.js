import React, { useState, useEffect} from "react";
import Employee from "../Employee/employee";
//import PropTypes from "prop-types";
import EditEmployee from '../editEmployee'
import Modal from "react-modal";
import styles from "./employees.module.css";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter, deleteEmployeeAsync, loadEmployeesAsync, setFilter } from "../../store/slices/employeeSlice";
import searchButtons from "../../images/search.png";
import close from "../../images/close.png";
import remove from "../../images/delete.png";


function Employees(props) {
//made objects for operations
	//axios objects
	//const inputRef = useRef(null);
	const dispatch = useDispatch();
	const {employees} = useSelector(state => state.employees)
	const {displayEmployees} = useSelector(state => state.displayEmployees)
	//edit object
	const [editEmployee,setEditEmployee] = useState(null);

  const backText = "< Back"

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
    document.body.style.overflow = 'hidden';
		setEditEmployee(emp);
	}

	const handleCloseEditEmployee = () =>
	{
    document.body.style.overflow = 'unset';
		setEditEmployee(null);
	}

	let editModal = null;

	if(editEmployee)
	{
		Modal.setAppElement('body');
		editModal = (
      <>
        <Modal className="modal " isOpen={true}>
          <div className={`modalHeaderMobile `}>
            <section className={styles.header}>
              <h1>Employees</h1>
              <div className={styles.headerInteractables}>
                <button
                  className={styles.mobile}
                  onClick={() => {
                    handleCloseEditEmployee();
                  }}
                >
                  <div>
                    <div></div>
                  </div>
                  <p className={styles.buttonText}>Overview</p>
                </button>
              </div>
              <p
                className={[styles.backText].join(" ")}
                onClick={() => {
                  handleCloseEditEmployee();
                }}
              >
                {" "}
                {backText}{" "}
              </p>
            </section>
          </div>
          <EditEmployee id={editEmployee.employeeId}></EditEmployee>
          <button
            className={`${styles.closeButton} ${styles.desktop} `}
            onClick={() => {
              handleCloseEditEmployee();
            }}
          >
            <img src={close} alt="close"></img>
          </button>
          <div>
            <button
              className={styles.archive}
              onClick={() => {
                const temp = editEmployee;
                dispatch(deleteEmployeeAsync(temp));
                handleCloseEditEmployee();
              }}
            >
              <img className={styles.desktop} alt="delete" src={remove}></img>
              ArchiveEmployee
            </button>
          </div>
        </Modal>
      </>
    );
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
    <div className={styles.employeesDisplay}>
      <section className={styles.header}>
        <h1>Employees</h1>
        <div className={styles.headerInteractables}>
          <button>
            <div className={styles.circleOne}>
              <div className={styles.circleTwo}></div>
            </div>
            <p className={styles.buttonText}>Overview</p>
          </button>
          <section className={styles.searchbar}>
            <input
              type="text"
              onChange={(evt) => dispatch(setFilter(evt.target.value))}
              onKeyUp={(e) => {
                if (e.key === "Enter")
                {
                  dispatch(applyFilter(employees))
                }
           }}
            ></input>
            <button onClick={() => dispatch(applyFilter(employees))}>
              {" "}
              <img src={searchButtons} alt="search"></img>{" "}
            </button>
          </section>
        </div>
      </section>
      <section className={`${styles.employee} ${styles.desktop}`}>
        {/* table top */}
        <p className={ styles.desktop} >Employee</p>
        <p className={ styles.desktop}>Shifts</p>
        <p className={ styles.desktop}>Job Title</p>
        <p className={ styles.desktop}>department</p>
        <p className={ styles.desktop}>Employee ID</p>
        <p className={ styles.desktop}>Start Date</p>
        <p className={ styles.desktop}>Options</p>
      </section>
      <section>
        {displayEmployees.map((employee) => (
          <Employee
            // top level information
            key={employee.employeeId}
            firstName={employee.firstName}
            lastName={employee.lastName}
            title={checkIfNull(employee.jobTitle)}
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
              dispatch(deleteEmployeeAsync(employee));
            }}
          ></Employee>
        ))}
        {editModal}
      </section>
    </div>
  );
}

export default Employees;