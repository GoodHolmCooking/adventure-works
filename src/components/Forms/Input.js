import React from "react";
import styles from "./Input.module.css";

const Input = props => {
	let elem = null;
	const classes = [];
	if (props.attrs.className) classes.push(props.attrs.className.replace("invalid", "").trim());
	if (props.valid === false) classes.push("invalid");
	props.attrs.className = classes.join(" ").trim();

	switch (props.kind) {
		case "textarea":
			elem = <textarea {...props.attrs} value={props.value} onChange={props.changed}></textarea>;
			break;
		case "select":
			elem = props.value
			break;
		default:
			elem = <input {...props.attrs} value={props.value} onChange={props.changed} />;
	}

	const errors = [];
	if (props.errors) {
		for (let key in props.errors) {
			errors.push(props.errors[key]);
		}
	}

	let errorContent = null;
	if (errors.length) {
		const errMsgs = errors.map((err, idx) => <li key={idx}>{err}</li>);
		errorContent = <ul className="validation-errors">{errMsgs}</ul>;
	}
	if(props.label === "")
	{
		return (
			<div className={styles.input}>
				{elem}
				{errorContent}
			</div>
		);
	}
	else
	{
		return (
			<div className={styles.input}>
				<label>{props.label}</label>
				{elem}
				{errorContent}
			</div>
		);
	}
	
};

export default Input;
