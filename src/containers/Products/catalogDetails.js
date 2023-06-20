import { Link, useParams } from "react-router-dom";
import styles from "./catalogDetails.module.css";
import catalogForm from "../../components/Forms/catalogForm"
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsToolbar from "../../components/Products/productsToolbar";


const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


// const ProductDetails = props => {
//     const [product, setProduct] = useState({});
//     const [productNumber, setNumber] = useState([]);
//     const [color, setColor] = useState([]);
//     const [listPrice, setListPrice] = useState(0);

//     const { id } = useParams();
//     const { photo } = useParams();
    
//     const [catalog, setCatalog] = useState({});
//     const [editingName, setEditingName] = useState(false);


//     useEffect(() => {
//         axios.get(`https://api.bootcampcentral.com/api/Product/${id}`)
//             .then(resp => {
//                 setProduct(resp.data);
//                 setNumber(resp.data.productNumber);
//                 setColor(resp.data.color);
//                 setListPrice(resp.data.listPrice);
//             })
//     }, [id]);

function CatalogDetails() {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    // const [catalog, setCatalog] = useState({});

    const [editProduct, setEditProduct] = useState(false);

    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/Product/${id}`)
            .then(resp => {
                setProduct({
                    productId: resp.data.productId,
                    productName: resp.data.productName,
                    productNumber: resp.data.productNumber,
                    summary: resp.data.summary,
                    photo: resp.data.photo,
                    color: resp.data.color,
                    listPrice: resp.data.listPrice,
                    productLine: resp.data.productLine,
                    productModelId: resp.data.productModelId,
                    productModelName: resp.data.productModelName,
                    wheelDescription: resp.data.wheelDescription,
                    saddleDescription: resp.data.saddleDescription,
                    pedalDescription: resp.data.pedalDescription,
                    riderExperience: resp.data.riderExperience,
                    manufacturer: resp.data.manufacturer,
                    bikeFrame: resp.data.bikeFrame,
                    crankset: resp.data.crankset,
                    material: resp.data.material,
                    style: resp.data.style,
                    warrantyPeriod: resp.data.warrantyPeriod,
                    warrantyDescription: resp.data.warrantyDescription,
                    maintenanceDescription: resp.data.maintenanceDescription,
                    numberOfSteps: resp.data.numberOfSteps,
                    setupHours: resp.data.setupHours,
                    machineHours: resp.data.machineHours,
                    laborHours: resp.data.laborHours,
                    lotSize: resp.data.lotSize,
                });
            });
    }, [id]);


    useEffect(() => {
        toggleEditProduct();
    }, [product]);

    const toggleEditProduct = () => {
        setEditProduct(!editProduct);
    };

    return (
        <div>
            <ProductsToolbar area="products" />
            <section>

                {Object.keys(product).length === 0 && <h3>Loading...</h3>}
                {Object.keys(product).length !== 0 &&
                    <div>
                        <Link to="/catalog">
                            <img src="../../images/ArrowLeft.png" alt="navigate back" />
                            <p>Back</p>
                        </Link>

                        {/* still trying to figure this part out */}
                        <div>
                            <img src="/photo" alt="" />
                        </div>


                        {!editProduct &&
                            <div>
                                <div>
                                    <h1>{product.productName}</h1>
                                    <button onClick={toggleEditProduct}>
                                        <img src="../../images/Pencilicon.png" alt="edit catalog"/>
                                    </button>
                                </div>
                                <div>
                                    <p>{product.productNumber}</p>
                                    <p>{product.color}</p>
                                    <p>{product.listPrice}</p>
                                </div>
                            </div>
                        }

                        {editProduct &&
                            <div>
                                <catalogForm
                                    product = {product}
                                    setProduct = {setProduct}
                                    toggleEdit = {toggleEditProduct}
                                    />
                                    <button onClick={toggleEditProduct}>Cancel</button>
                            </div>
                        }

                        <div>
                            <div>
                                <h4>Product Details</h4>
                            </div>
                            <div>
                                <p>Summary</p>
                                <p>${product.summary}</p>
                            </div>
                            <div>
                                <p>Product Model ID</p>
                                <p>{product.productModelId}</p>
                            </div>
                            <div>
                                <p>Manufacturer</p>
                                <p>${product.manufacturer}</p>
                            </div>
                            <div>
                                <p>Bike Frame</p>
                                <p>${product.bikeFrame}</p>
                            </div>
                            <div>
                                <p>Crankset</p>
                                <p>${product.crankset}</p>
                            </div>
                            <div>
                                <p>Material</p>
                                <p>${product.material}</p>
                            </div>
                            <div>
                                <p>Product Line</p>
                                <p>${product.productLine}</p>
                            </div>
                            <div>
                                <p>Style</p>
                                <p>${product.style}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h4>Product Description</h4>
                            </div>
                            <div>
                                <p>Wheel Description</p>
                                <p>{product.wheelDescription}</p>
                            </div>
                            <div>
                                <p>Saddle Description</p>
                                <p>{product.saddleDescription}</p>
                            </div>
                            <div>
                                <p>Pedal Description</p>
                                <p>{product.pedalDescription}</p>
                            </div>
                            <div>
                                <p>Rider Experience</p>
                                <p>{product.riderExperience}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h4>Warranty & Maintenance</h4>
                            </div>
                            <div>
                                <p>Warranty Period</p>
                                <p>{product.warrantyPeriod}</p>
                            </div>
                            <div>
                                <p>Warranty Description</p>
                                <p>{product.warrantyDescription}</p>
                            </div>
                            <div>
                                <p>Maintenance Description</p>
                                <p>${product.maintenanceDescription}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h4>Manufacturing Details</h4>
                            </div>
                            <div>
                                <p>Manufacturer</p>
                                <p>{product.manufacturer}</p>
                            </div>
                            <div>
                                <p>Model Name</p>
                                <p>{product.productModelName}</p>
                            </div>
                            <div>
                                <p>Model ID</p>
                                <p>{product.productModelId}</p>
                            </div>
                            <div>
                                <p>Step</p>
                                <p>{product.numberOfSteps}</p>
                            </div>
                            <div>
                                <p>Set Up Hours</p>
                                <p>{product.setupHours}</p>
                            </div>
                            <div>
                                <p>Machine Hours</p>
                                <p>{product.machineHours}</p>
                            </div>
                            <div>
                                <p>Labor Hours</p>
                                <p>{product.laborHours}</p>
                            </div>
                            <div>
                                <p>Lot Size</p>
                                <p>{product.lotSize}</p>
                            </div>
                            {/* Still need to find out where this is in the API */}
                            {/* <div>
                                <p>instructions</p>
                                <p>{product.instructions}</p>
                            </div> */}
                        </div>
                        <div>
                            <button onClick={scrollToTop}>
                                <img src="../../images/ArrowUp.png" alt="scroll to top" />
                                <p>Back to Top</p>
                            </button>
                        </div>
                        
                    </div>
                
                }

            </section>
        </div>
    );
};

export default CatalogDetails;