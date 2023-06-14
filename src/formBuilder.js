import React from "react";
import Input from "./components/Forms/Input";
import { useSelector } from "react-redux";
import axios from "axios";

const formBuilder = {
	

	configInput(kind, type, label, placeholder, validation = {}, value = "") {
		const settings = { kind, label, value, validation, attrs: {}};

		if (typeof type !== "undefined") {
			settings.attrs.type = type;
		}

		if (placeholder !== null && typeof placeholder !== "undefined") {
			settings.attrs.placeholder = placeholder;
		} else {
			settings.attrs.placeholder = "enter " + label.toLowerCase();
		}

		return settings;
	},

	buildForm(settings, handler) {
		const elements = [];
		for (let key in settings) {
			elements.push({ id: key, config: settings[key] });
		}

		const content = elements.map(elem => (
			<Input
				key={elem.id}
				label={elem.config.label}
				kind={elem.config.kind}
				value={elem.config.value}
				attrs={elem.config.attrs}
				changed={event => handler(event, elem.id)}
				valid={elem.config.valid}
				errors={elem.config.errors}
			/>
		));
		return content;
	},
	
	// formBuilder.configInput("input", "number", "Business Entity ID", "", {required: true}, vendor.businessEntityId)
	checkValidity(inputConfig) {
		inputConfig.valid = true;
		inputConfig.errors = {};

		if (inputConfig.validation.required) {
			if (inputConfig.type === "text") {
				if (inputConfig.value.trim() === "") {
					inputConfig.valid = false;
					inputConfig.errors.required = `You must enter a value for ${inputConfig.label}`;
				}
			}

			if (inputConfig.type === "number") {
				if (inputConfig.value === null || inputConfig.value <= 0) {
					inputConfig.valid = false;
					inputConfig.errors.required = `You must enter a valid value for ${inputConfig.label}`;
				}
			}
		}

		if (inputConfig.validation.minLength) {
			if (inputConfig.value.trim().length < inputConfig.validation.minLength) {
				inputConfig.valid = false;
				inputConfig.errors.minLength = `${inputConfig.label} must be at least ${inputConfig.validation.minLength} characters`;
			}
		}

		if (inputConfig.validation.exactLength) {
			if (inputConfig.value.toString().trim().length !== inputConfig.validation.exactLength) {
				inputConfig.valid = false;
				inputConfig.errors.minLength = `${inputConfig.label} must be exactly ${inputConfig.validation.exactLength} characters`;
			}
		}

		if (inputConfig.validation.format) {
			switch (inputConfig.validation.format) {
				case "email":
					// @ symbol present?
					break;
				// phone is actually handled through the exact length validation and numberToPhone function.
				default:
					inputConfig.errors.format = `${inputConfig.label} must be in the proper format`;
			}
		}
	},
};
export default formBuilder;
