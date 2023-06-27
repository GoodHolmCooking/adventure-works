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
        <div className={styles.modalArea}>
            <section className={styles.modalDetails}>
                {Object.keys(catalog).length === 0 }
                {Object.keys(catalog).length !== 0 && 
                    <div>
                        {!editCatalog &&
                            <div className={styles.nameBlock}>
                                <div className={styles.header}>
                                    {/* <img src={`data:image/jpeg;base64,${product.thumbnailPhoto}`} alt="" /> */}
                                    <h1>{catalog.productName}</h1>
                                    <button className={styles.button} onClick={toggleEditCatalog}>
                                        <img src="../../../images/Pencilicon.png" alt="edit catalog"/>
                                    </button>
                                </div>
                                <div className={styles.subContent}>
                                    <p>{catalog.productNumber}</p>
                                    <p>{catalog.color}</p>
                                    <p>${catalog.listPrice}</p>
                                </div>
                            </div>
                        }

                        {editCatalog &&
                            <div className={styles.form}>
                                <CatalogForm
                                    product={catalog}
                                    setProduct={setCatalog}
                                    toggleEdit={toggleEditCatalog}
                                    />
                                    <button className={styles.cancelButton} onClick={toggleEditCatalog}>Cancel</button>
                            </div>
                        }


                        <div className={styles.content}>
                            <div>
                                <h4>Product Description</h4>
                            </div>
                            <div className={styles.space}>
                                <div>
                                    <span>Wheel Description</span>
                                    <p>{catalog.wheelDescription}</p>
                                </div>
                                <div>
                                    <span>Saddle Description</span>
                                    <p>{catalog.saddleDescription}</p>
                                </div>
                                <div>
                                    <span>Pedal Description</span>
                                    <p>{catalog.pedalDescription}</p>
                                </div>
                                <div>
                                    <span>Rider Experience</span>
                                    <p>{catalog.riderExperience}</p>
                                </div>
                            </div> 
                        </div>

                        <div className={styles.group}>
                            <div className={styles.columnRow}>
                                <div className={styles.content}>
                                    <div>
                                        <h4>Product Details</h4>
                                    </div>
                                    <div>
                                        <span>Summary</span>
                                    </div>
                                    <div>
                                        <p>{catalog.summary}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Product Model ID:</p>
                                        <p>{catalog.productModelId}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Manufacturer:</p>
                                        <p>{catalog.manufacturer}</p>
                                    </div>
                                    <div>
                                        <span>Bike Frame</span>
                                    </div>
                                    <div>
                                        <p>{catalog.bikeFrame}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Crankset:</p>
                                        <p>{catalog.crankset}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Material:</p>
                                        <p>{catalog.material}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Product Line:</p>
                                        <p>{catalog.productLine}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Style:</p>
                                        <p>{catalog.style}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.columnRow}>
                                <div className={styles.content}>
                                    <div>
                                        <h4>Manufacturing Details</h4>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Manufacturer:</p>
                                        <p>{catalog.manufacturer}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Model Name:</p>
                                        <p>{catalog.productModelName}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Model ID:</p>
                                        <p>{catalog.productModelId}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Step:</p>
                                        <p>{catalog.numberOfSteps}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Set Up Hours:</p>
                                        <p>{catalog.setupHours}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Machine Hours:</p>
                                        <p>{catalog.machineHours}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Labor Hours:</p>
                                        <p>{catalog.laborHours}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Lot Size:</p>
                                        <p>{catalog.lotSize}</p>
                                    </div>
                                    <div className={styles.space}>
                                        <span>instructions</span>
                                        <p>{catalog.instructions}</p>
                                    </div>
                                </div>
                            </div>
                                
                            <div className={styles.columnRow}>
                                <div className={styles.content}>
                                    <div>
                                        <h4>Warranty & Maintenance</h4>
                                    </div>
                                    <div className={styles.space}>
                                        <p>Warranty Period:</p>
                                        <p>{catalog.warrantyPeriod}</p>
                                    </div>
                                    <div>
                                        <span>Warranty Description</span>
                                    </div>
                                    <div>
                                        <p>{catalog.warrantyDescription}</p>
                                    </div>
                                    <div>
                                        <span>Maintenance Description</span>
                                    </div>
                                    <div>
                                        <p>{catalog.maintenanceDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                            
                            

                        
                        
                        <button className={styles.closeButton} onClick={handleClose}>
                            <img src="../../../images/XIcon.png" alt="close modal"/>
                        </button>

                    </div>   
                }         
            </section>
        </div>
    );
}

export default CatalogDetailsModal;