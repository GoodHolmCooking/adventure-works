import React from "react";
import PropTypes from "prop-types";
import styles from "./employee.module.css"

function Employee(props) {
	
	return (
    <div className={styles.employee} >
      <p>{props.firstName} {props.lastName}</p>
      <p>{props.shift}</p>
      <p>{props.title}</p>
      <p>{props.department}</p>
      <p>{props.id}</p>
      <p>{props.start}</p>
      <div>
        <button onClick={props.edit}>edit</button>
        <button onClick={props.delete}>Remove</button>
      </div>
    </div>
  );
}

Employee.propTypes = {
	firstName: PropTypes.string,
  lastName: PropTypes.string,
	shift: PropTypes.string,
	title: PropTypes.string,
	department: PropTypes.string,
	id: PropTypes.number,	
	edit: PropTypes.func,
	delete: PropTypes.func,
};

export default Employee;
