import styles from "./catalogDetailsModal.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CatalogForm from "../../components/Forms/catalogForm";

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const CatalogDetailsModal = props => {
    const { id, expandFunction } = props;

    const [catalog, setCatalog] = useState({});

    const [editCatalog, setEditCatalog] = useState(false);

    // initial load
    useEffect(() => {
        axios.get(`https://api.bootcampcentral.com/api/Product/${id}`)
            .then(resp => {
                setCatalog({
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
        toggleEditCatalog();
    }, [catalog]);

    const toggleEditCatalog = () => {
        setEditCatalog(!editCatalog);
    };

    const handleClose = () => {
        expandFunction({});
    }

    return (
        <div>
            <section>
                {Object.keys(catalog).length === 0 }
                {Object.keys(catalog).length !== 0 && 
                    <div>
                        {!editCatalog &&
                            <div>
                                <div>
                                    <h1>{catalog.productName}</h1>
                                    <button onClick={toggleEditCatalog}>
                                        <img src="../../images/Pencilicon.png" alt="edit catalog"/>
                                    </button>
                                </div>
                                <div>
                                    <p>{catalog.productNumber}</p>
                                    <p>{catalog.color}</p>
                                    <p>${catalog.listPrice}</p>
                                </div>
                            </div>
                        }

                        {editCatalog &&
                            <div>
                                <CatalogForm
                                    product={catalog}
                                    setProduct={setCatalog}
                                    toggleEdit={toggleEditCatalog}
                                    />
                                    <button onClick={toggleEditCatalog}>Cancel</button>
                            </div>
                        }

                        <div>
                            <div>
                                <h4>Product Details</h4>
                            </div>
                            <div>
                                <p>Summary</p>
                                <p>{catalog.summary}</p>
                            </div>
                            <div>
                                <p>Product Model ID</p>
                                <p>{catalog.productModelId}</p>
                            </div>
                            <div>
                                <p>Manufacturer</p>
                                <p>{catalog.manufacturer}</p>
                            </div>
                            <div>
                                <p>Bike Frame</p>
                                <p>{catalog.bikeFrame}</p>
                            </div>
                            <div>
                                <p>Crankset</p>
                                <p>{catalog.crankset}</p>
                            </div>
                            <div>
                                <p>Material</p>
                                <p>{catalog.material}</p>
                            </div>
                            <div>
                                <p>Product Line</p>
                                <p>{catalog.productLine}</p>
                            </div>
                            <div>
                                <p>Style</p>
                                <p>{catalog.style}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h4>Product Description</h4>
                            </div>
                            <div>
                                <p>Wheel Description</p>
                                <p>{catalog.wheelDescription}</p>
                            </div>
                            <div>
                                <p>Saddle Description</p>
                                <p>{catalog.saddleDescription}</p>
                            </div>
                            <div>
                                <p>Pedal Description</p>
                                <p>{catalog.pedalDescription}</p>
                            </div>
                            <div>
                                <p>Rider Experience</p>
                                <p>{catalog.riderExperience}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h4>Warranty & Maintenance</h4>
                            </div>
                            <div>
                                <p>Warranty Period</p>
                                <p>{catalog.warrantyPeriod}</p>
                            </div>
                            <div>
                                <p>Warranty Description</p>
                                <p>{catalog.warrantyDescription}</p>
                            </div>
                            <div>
                                <p>Maintenance Description</p>
                                <p>{catalog.maintenanceDescription}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h4>Manufacturing Details</h4>
                            </div>
                            <div>
                                <p>Manufacturer</p>
                                <p>{catalog.manufacturer}</p>
                            </div>
                            <div>
                                <p>Model Name</p>
                                <p>{catalog.productModelName}</p>
                            </div>
                            <div>
                                <p>Model ID</p>
                                <p>{catalog.productModelId}</p>
                            </div>
                            <div>
                                <p>Step</p>
                                <p>{catalog.numberOfSteps}</p>
                            </div>
                            <div>
                                <p>Set Up Hours</p>
                                <p>{catalog.setupHours}</p>
                            </div>
                            <div>
                                <p>Machine Hours</p>
                                <p>{catalog.machineHours}</p>
                            </div>
                            <div>
                                <p>Labor Hours</p>
                                <p>{catalog.laborHours}</p>
                            </div>
                            <div>
                                <p>Lot Size</p>
                                <p>{catalog.lotSize}</p>
                            </div>

                             <div>
                                <p>instructions</p>
                                <p>{catalog.instructions}</p>
                            </div>
                        </div>
                        
                        <button onClick={handleClose}>
                            <img src="../../images/XIcon.png" alt="close modal"/>
                        </button>

                    </div>   
                }         
            </section>
        </div>
    );
}

export default CatalogDetailsModal;