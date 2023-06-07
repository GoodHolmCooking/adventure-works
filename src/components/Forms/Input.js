import React from "react";
import styles from "./Input.module.css";

const input = props => {
    let elem = null;
    const classes = [];
    if (props.attrs.className) {
        classes.push(props.attrs.className.replace("invalid", "").trim());
    }

    if (props.valid === false) {
        classes.push("invalid");
    }

    props.attrs.className = classes.join(' ').trim();

    const errors = [];
    if (props.errors) {
        for (let key in props.errors) {
            errors.push(props.errors[key]);
        }
    };

    let errorContent = null;
    if (errors.length) {
        const errMsgs = errors.map((err, idx) => (<li key={idx}>{err}</li>));
        errorContent = (
            <ul className="validation-errors">
                {errMsgs}
            </ul>
        );
    }

    switch(props.kind) {
        case("textarea"):
            elem = <textarea {...props.attrs} onChange={props.changed} />
            break;
        default:
            elem = <input {...props.attrs} onChange={props.changed}/>
    }

    return (
        <div className={styles.input}>
            <label>{props.label}</label>
            {elem}
            {errorContent}
        </div>
    );
};

export default input;