import React, { useEffect, useState } from "react";
//import PropTypes from "prop-types";
//import Employee from "./Employee/employee";
import styles from "../components/editEmployee.module.css";
import axios from "axios";
import formBuilder from "../formBuilder";
import { toast } from "react-toastify";
import { useDispatch} from "react-redux";
import edit from "../images/edit.png"
//import { loadEmployeesAsync } from "../store/slices/employeeSlice";
import { updateEmployee } from "../store/slices/employeeSlice";
//default forms
const topEditFormBuilder = {
  name: formBuilder.configInput("input", "text", "Name", null, { required: true, minLength: 2 }),
  title: formBuilder.configInput("input", "text", "Title", null, { required: true }),
  emplyeeId: formBuilder.configInput("input", "number", "employee id",null,{})
};

const personalEditFormBuilder = {
  firstName: formBuilder.configInput("input", "text", "first name", null, { required: true, minLength: 2 }),
  middleName: formBuilder.configInput("input", "text", "middle name", null),
  lastName: formBuilder.configInput("input", "text", "last name", null, { required: true, minLength: 2 }),
  suffix: formBuilder.configInput("input", "text", "suffix", null),
};

const employmentEditFormBuilder = {
  title: formBuilder.configInput("input", "string", "title",null,{required: true},),
          employeeId: formBuilder.configInput("input", "string", "employee id",0,{},),
          //department: formBuilder.configInput("select","","department","",{},departments),
          //shift: formBuilder.configInput("select","","Shift","",{},shifts),
          start: formBuilder.configInput("input", "text", "start date", null,{},),
          end:  formBuilder.configInput("input", "text", "end date", null,{},),

};

function EditEmployee(props) {
    // display consts
    const [editCardTop,setEditCardTop] = useState(false);
    const [editPersonalInfo,setEditPersonalInfo] = useState(false);
    const [editCEmploymentInfo,setEmploymentInfo] = useState(false);
    const [employee,setEmployee] = useState(false);
    //form consts
    const [topEditForm, setTopEditForm] = useState(topEditFormBuilder);
    const [personalEditForm, setPersonalEditForm] = useState(personalEditFormBuilder);
    const [employmentEditForm, setEmploymentEditForm] = useState(employmentEditFormBuilder);
    const [department,setDepartment] = useState(0);
    const [shift, setShift] = useState(0);
    //get based on the id
    const id = props.id;
    //misc
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    //handle the get one employee here, will need personal information
    //and employment information form 2 different get requests
    useEffect(() => {
      
      try 
      {
       // console.log(id);
        axios
          .get(`/Employee/${id}`)
          .then((resp) => {
            let tmp = resp.data;
            let emp = {
              id: tmp.employeeNumber,
              name: tmp.firstName + " " + tmp.lastName,
              title: tmp.title,
              firstName: tmp.firstName,
              middleName: tmp.middleName,
              lastName: tmp.lastName,
              suffix: tmp.suffix,
              department: tmp.shiftHistory[0].departmentId,
              departmentName: tmp.shiftHistory[0].departmentName,
              shift: tmp.shiftHistory[0].shiftId,
              startDate: tmp.shiftHistory[0].startDate,
              endDate: tmp.shiftHistory[0].endDate,
            };
            setEmployee(emp);
            setDepartment(emp.department);
            setShift(emp.shift)
          });
      } 
      catch (err) 
      {
        toast.error(err);
      }
      
    },[id,shift]);
    let name = employee.firstName + " " + employee.lastName
    //formbuilders
    
    useEffect(() => {
      if(editCardTop)
      {

        const editCardTopFormBuilder =
        {
         name: formBuilder.configInput("input", "text", "", null, { required: true, minLength: 2 }, name),
         title: formBuilder.configInput("input", "text", "", null, { required: true },employee.title),
         emplyeeId: formBuilder.configInput("input", "number", "",null,{},employee.employeeId)
        }
        setTopEditForm(editCardTopFormBuilder)
      }
    },[editCardTop,employee,name])
    
    const handleTopInputChange = (evt, id) => {
      const updatedForm = { ...topEditForm };
      const updatedElement = { ...updatedForm[id] };
      updatedElement.value = evt.target.value;
      updatedForm[id] = updatedElement;
      formBuilder.checkValidity(updatedElement);
      setTopEditForm(updatedForm);
    };

    useEffect(() => {
      if(editPersonalInfo)
      {

        const editCardPersonalFormBuilder =
        {
          firstName: formBuilder.configInput("input", "text", "first name", null, { required: true, minLength: 2 },employee.firstName),
          middleName: formBuilder.configInput("input", "text", "middle name", null,{},employee.middleName),
          lastName: formBuilder.configInput("input", "text", "last name", null, { required: true, minLength: 2 }, employee.lastName),
          suffix: formBuilder.configInput("input", "text", "suffix", null, {},employee.suffix),
        }
        setPersonalEditForm(editCardPersonalFormBuilder)
      }
    },[editPersonalInfo,employee])
    
    const handlePersonalInputChange = (evt, id) => {
      const updatedForm = { ...personalEditForm };
      const updatedElement = { ...updatedForm[id] };
      updatedElement.value = evt.target.value;
      updatedForm[id] = updatedElement;
      formBuilder.checkValidity(updatedElement);
      setPersonalEditForm(updatedForm);
    };

    const handleChangeShift = (e) => {
      setShift(e.target.value);
    }

    const handleChangeDepartment = (e) => {
      setDepartment(e.target.value);
    }


    useEffect(() => {
      let departments = 
      (
       
        <select name="shifts" defaultValue={employee.department} onChange={handleChangeDepartment} >
          <option value={7}>Production</option>
          <option value={2}>inventory</option>
          <option value={1}>shipping</option>
          <option value={3}>packaging</option>
          <option value={0}></option>
        </select>
      );
      let shifts = 
      (
        <select name="shifts" defaultValue={employee.shift} onChange={handleChangeShift}>
          <option value={1}>Shift 1</option>
          <option value={2}>shift 2</option>
          <option value={3}>shift 3</option>
          <option value={0}></option>
        </select>
      );
      if(editCEmploymentInfo)
      {
        const editCardEmploymentFormBuilder =
        {
          title: formBuilder.configInput("input", "string", "title",null,{}, employee.title),
          employeeId: formBuilder.configInput("input", "string", "employee id",null,{}, employee.employeeId),
          department: formBuilder.configInput("select","","department","",{},departments),
          shift: formBuilder.configInput("select","","Shift","",{},shifts),
          start: formBuilder.configInput("input", "text", "start date", null,{},employee.startDate),
          end:  formBuilder.configInput("input", "text", "end date", null,{},employee.endDate),
        }
        setEmploymentEditForm(editCardEmploymentFormBuilder)
      }
    },[editCEmploymentInfo,employee,])
    
    const handleEmploymentInputChange = (evt, id) => {
      const updatedForm = { ...employmentEditForm };
      const updatedElement = { ...updatedForm[id] };
      updatedElement.value = evt.target.value;
      updatedForm[id] = updatedElement;
      formBuilder.checkValidity(updatedElement);
      setEmploymentEditForm(updatedForm);
    };


    //on puts 

    const handlePutPersonal = evt => {
      evt.preventDefault();
  
      let hasError = error ? false : false;
  
      for (let elt in personalEditForm) {
        formBuilder.checkValidity(personalEditForm[elt]);
        if (!personalEditForm[elt].valid) {
          hasError = true;
        }
      }
      if (hasError) {
        toast.error("you must properly fill out the form");
        setError(true);
        return;
      }

      //make data format from table
      const data = {
        firstName: personalEditForm.firstName.value,
        lastName: personalEditForm.lastName.value,
        middleName: personalEditForm.middleName.value,
        suffix: personalEditForm.suffix.value,
        id: id
      };
      //put data into database
      axios.put(`/Employee/Personal/${id}`,data)
      .then(resp => {
        if(resp)
        {
          setEmployee({...employee,...data})
          dispatch(updateEmployee(data))
        }
        setEditPersonalInfo(false);
      })
      .catch(err => {
        console.log("Error in put")
          console.log(err);
      })
    };

    const handlePutTop = evt => {
      evt.preventDefault();
  
      let hasError = error ? false : false;
  
      for (let elt in  topEditForm) {
        formBuilder.checkValidity(topEditForm[elt]);
        if (!topEditForm[elt].valid) {
          hasError = true;
        }
      }
      if (hasError) {
        toast.error("you must properly fill out the form");
        setError(true);
        return;
      }
        const name = topEditForm.name.value;
        const tmp = name.split(' ');
      //make data format from table
      const personalData = {
        firstName: tmp[0],
        lastName: tmp[1],
        middleName: employee.middleName,
        suffix: employee.suffix,
        id: id
      };
      const employmentData = {
        title: topEditForm.title.value,
        employeeId: topEditForm.emplyeeId.value,
        department:employee.department,
        id: id
      };
      //put data into database
      axios.put(`/Employee/Personal/${id}`,personalData)
      .then(resp => {
        if(resp)
        {
          setEmployee({...employee,...personalData})
          dispatch(updateEmployee(personalData))
          axios.put(`/Employee/Employment/${id}`,employmentData)
          .then(resp => {
            if(resp)
            {
              setEmployee({...employee,...employmentData})
              dispatch(updateEmployee(employmentData))
            }
            setEditCardTop(false);
          })
          .catch(err => {
            console.log("Error in put")
              console.log(err);
          })
        }
      })
      .catch(err => {
        console.log("Error in put")
          console.log(err);
      })
    };


    const handlePutEmployment = evt => {
      evt.preventDefault();
      let hasError = error ? false : false;
      for (let elt in employmentEditForm) {
        formBuilder.checkValidity(employmentEditForm[elt]);
        if (!employmentEditForm[elt].valid) {
          hasError = true;
        }
      }
      if (hasError) {
        toast.error("you must properly fill out the form");
        setError(true);
        return;
      }
      //console.log(employmentEditForm.department.value)
      //make data format from table
      const data = {
        title: employmentEditForm.title.value,
        employeeId: employmentEditForm.employeeId.value,
        department: department,
        shift: shift,
        start: employmentEditForm.start.value,
        endDate: employmentEditForm.end.value,
        id: id
      };
      //put data into database
      axios.put(`/Employee/Employment/${12}`,data,{crossDomain:true})
      .then(resp => {
        if(resp)
        {
          setEmployee({...employee,...data})
          dispatch(updateEmployee(data))
        }
        setEmploymentInfo(false);
      })
      .catch(err => {
        console.log("Error in put")
          console.log(err);
      })
    };



    const topFormContent = formBuilder.buildForm(topEditForm, handleTopInputChange);
    const personalFormContent = formBuilder.buildForm(personalEditForm, handlePersonalInputChange);
    const employmentFormContent = formBuilder.buildForm(employmentEditForm, handleEmploymentInputChange);


    let cardTop = null;
    if (editCardTop) {
      cardTop = (
        <form onSubmit={handlePutTop}>
				{topFormContent}
				<button className={styles.saveButtonFirst}>Save Changes</button>
        <button className={styles.cancel} onClick={() => {setEditCardTop(false)}}>Cancel</button>
      </form>
      )
    } 
    else {
      cardTop = (
        <>
          <div className={styles.modalHeader}>
            <h2>{employee.name}</h2>
            <button className={[styles.editButtonTop, styles.desktop].join(" ")} onClick={() => { 
              setEditCardTop(true)
              setEditPersonalInfo(false)
              setEmploymentInfo(false)
              }}>
             <img src={edit} alt="edit" ></img>
            </button>
          </div>
          <p className={styles.informationDisplay}>Title</p>
          <p className={styles.informationDisplay}>Employee ID</p>
        </>
      );
    }
  

    let personalInfo = null;
    if(editPersonalInfo)
    {
      personalInfo =  (
        <form onSubmit={handlePutPersonal}>
           <h2>Personal Information</h2>
				{personalFormContent}
				<button className={styles.saveButton}>Save Changes</button>
        <button onClick={() => {setEditPersonalInfo(false)}} className={styles.cancel}>Cancel</button>
      </form>
      )
    } 
    else {
      personalInfo = 
    (
      <>
         <div className={styles.modalHeader}>
        <h2>Personal Information</h2>
        <button className={styles.editButton} onClick={() => {
          setEditCardTop(false)
          setEditPersonalInfo(true)
          setEmploymentInfo(false)
        }}>
          <img src={edit} alt="edit" ></img>
        </button>
      </div>
      <div className={styles.informationDisplay}>
        <span>First Name</span>
        <p>{employee.firstName}</p>
      </div>
      <div className={styles.informationDisplay}>
        <span>Middle Name</span>
        <p>{employee.middleName}</p>
      </div>
      <div className={styles.informationDisplay}>
        <span>Last Name</span>
        <p>{employee.lastName}</p>
      </div>
      <div className={styles.informationDisplay}>
        <span>Suffix</span>
        <p>{employee.suffix}</p>
      </div>
      </>
    )
    }

    
    let employmentInfo = null;
    if(editCEmploymentInfo)
    {
      employmentInfo = (
        <form onSubmit={handlePutEmployment}>
          <h2>Employment Information</h2>
				{employmentFormContent}
				<button className={styles.saveButton}>Save Changes</button>
        <button className={styles.cancel} onClick={() => {setEmploymentInfo(false)}}>Cancel</button>
      </form>
      )
    }
    else{
      employmentInfo = 
        (
        <>
          <div className={styles.modalHeader}>
        <h2>Employment Information</h2>
        <button className={styles.editButton} onClick={() => {
          setEditCardTop(false)
          setEditPersonalInfo(false)
          setEmploymentInfo(true)
        }}>
          <img src={edit} alt="edit" ></img>
        </button>
      </div>
      <div className={styles.informationDisplay}>
        <span>Job Title</span>
        <p>{employee.title}</p>
      </div>
      <div className={styles.informationDisplay}>
        <span>Employee ID</span>
        <p>{employee.employeeId}</p>
      </div>
      <div className={styles.informationDisplay}>
        <span>Department</span>
        <p>{employee.departmentName}</p>
      </div>
      <div className={styles.informationDisplay}>
        <span>Shift</span>
        <p>Shift {employee.shift}</p>
      </div>
      <div className={styles.informationDisplay}>
        <span>Start Date</span>
        <p>{employee.startDate}</p>
      </div>
      <div className={styles.informationDisplay}>
        <span>End Date</span>
        <p>{employee.endDate}</p>
      </div>
        </>
    )
    }
  

return (
  <div className={styles.modalWindow}>
    {/* top information */}
    <section className={`${styles.cardTop}`}>
      {cardTop}
    </section>
    {/* personal information section */}
    <section className={`${styles.displayBlock} ${styles.personalInfo}`}>
      {personalInfo}
    </section>
    <section className={`${styles.displayBlock} ${styles.employmentInfo}`}>
      {employmentInfo}
    </section>
  </div>
);
}


export default EditEmployee;