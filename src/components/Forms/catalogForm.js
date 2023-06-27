import { useState } from "react";
import formBuilder from "../../formBuilder";
import styles from "./catalogForm.module.css";
import { useDispatch } from "react-redux";
import { updateProductAsync } from "../../store/slices/productSlice";



const CatalogForm = props => {
	const {setProduct, product} = props;

	const dispatch = useDispatch();

    const form = {
        name: formBuilder.configInput("input", "text", "Product Name", "", {required: true}, product.productName),
        number: formBuilder.configInput("input", "number", "Product Number", "", {required: true}, product.productId),
        color: formBuilder.configInput("input", "text", "Color", "", {required: true}, product.color),
        price: formBuilder.configInput("input", "number", "List Price", "", {required: true}, product.listPrice),
    };

    const [formData, setFormData] = useState(form);
    const [error, setError] = useState(false);

    const handlePostData = evt => {
		console.log("Running handle post data.");
        evt.preventDefault();

		let hasError = false;

		// each element is a field. Check the validity of each form field.
		for (let element in formData) {
			formBuilder.checkValidity(formData[element]);
			if (!formData[element].valid) {
				hasError = true;
			}
		}

		if (hasError) {
			alert('You must properly fill out the form.');
			setError(true);
			return;
		}

		// updated product data
		let data = {
			productUpdate: {
				...product,
				productName: formData.name.value,
				productId: formData.number.value,
				productColor: formData.color.value,
				productListPrice: formData.price.value
			},
			callbacks: {
				setProduct: setProduct
			}
		};

		// update the database
		dispatch(updateProductAsync(data));
	};

    const handleInputChanges = (evt, id) => {
		const updatedForm = {...formData};
		const updatedElement = {...updatedForm[id]};
		updatedElement.value = evt.target.value;
		formBuilder.checkValidity(updatedElement);
		updatedForm[id] = updatedElement;
		setFormData(updatedForm);
	}

    const formContent = formBuilder.buildForm(formData, handleInputChanges);

    return (
        <form onSubmit={handlePostData}>
            {formContent}
            <button className={styles.saveButton}>Save Changes</button>
        </form>
    );
};

export default CatalogForm;











// const CatalogForm = props => {
//     const catalog = props.catalog;

//     const form = {
//         name: formBuilder.configInput("input", "text", "Product Name", "", {required: true}, catalog.name), //this may need to be catalog.productName, need to test
//         number: formBuilder.configInput("input", "number", "Product Number", "", {required: true}, catalog.productNumber),
//         color: formBuilder.configInput("input", "number", "Color", "", {required: true}, catalog.color),
//         listPrice: formBuilder.configInput("input", "number", "List Price", "", {required: true}, catalog.listPrice)
//     };

//     const [formData, setFormData] = useState(form);
//     const [error, setError] = useState(false);

//     const handlePostData = evt => {
//         evt.preventDefault();

// 		let hasError = false;

// 		for (let element in formData) {
// 			formBuilder.checkValidity(formData[element]);
// 			if (!formData[element].valid) {
// 				hasError = true;
// 			}
// 		}

// 		if (hasError) {
// 			alert('You must properly fill out the form.');
// 			setError(true);
// 			return;
// 		}

//         let products = catalog.products;
//         // contacts[0].phoneNumbers[0].phoneNumber = numberToPhone(formData.phone.value);

// 		const data = {
//             ...catalog,
// 			productName: formData.name.value,
// 			productId: formData.id.value,
//             products: [...products]
// 		};

// 		console.log(data);

// 		// Need to implement a store to carry state between form and details
// 		axios.put(`https://api.bootcampcentral.com/api/Product/${data.productId}`, data, {crossDomain: true})
// 		.then(resp => {
// 			console.log(resp);
// 		});
// 	};

//     const handleInputChanges = (evt, id) => {
// 		const updatedForm = {...formData};
// 		const updatedElement = {...updatedForm[id]};
// 		updatedElement.value = evt.target.value;
// 		formBuilder.checkValidity(updatedElement);
// 		updatedForm[id] = updatedElement;
// 		setFormData(updatedForm);
// 	}

//     const formContent = formBuilder.buildForm(formData, handleInputChanges);

//     return (
//         <form onSubmit={handlePostData}>
//             {formContent}
//             <button>Save Changes</button>
//         </form>
//     );
// };

// export default CatalogForm;