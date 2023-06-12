import React from "react";
import PropTypes from "prop-types";
import styles from "./employee.module.css";
import edit from "../../images/edit.png";
import deleteIcon from "../../images/delete.png";
import expand from "../../images/expand.png";
function Employee(props) {
	
	return (
    <div className={styles.employee} >
      <div>
      <p>{props.firstName} {props.lastName}</p>
      <p className={ styles.desktop} >{props.shift}</p>
      <p>{props.title}</p>
      <p className={ styles.desktop}>{props.department}</p>
      <p className={ styles.desktop} >{props.id}</p>
      <p className={ styles.desktop} >{props.start}</p>
      </div>
      <div>
        <button className={`${styles.faButton} ${styles.desktop}`} onClick={props.edit}> <img src={edit} alt="edit"></img> </button>
        <button className={`${styles.faButton} ${styles.desktop}`} onClick={props.delete}><img src={deleteIcon} alt="delete"></img></button>
        <button className={`${styles.faButton} ${styles.mobile}`} onClick={props.edit}> <img src={expand} alt="edit"></img> </button>
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
