import React from "react";
import Input from "./components/Forms/Input";

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
	
	checkValidity(inputConfig) {
		inputConfig.valid = true;
		inputConfig.errors = {};
		if (inputConfig.validation.required) {
			if (inputConfig.value.trim() === "") {
				inputConfig.valid = false;
				inputConfig.errors.required = `You must enter a value for ${inputConfig.label}`;
			}
		}

		if (inputConfig.validation.minLength) {
			if (inputConfig.value.trim().length < inputConfig.validation.minLength) {
				inputConfig.valid = false;
				inputConfig.errors.minLength = `${inputConfig.label} must be at least ${inputConfig.validation.minLength} characters`;
			}
		}
	},
};
export default formBuilder;
