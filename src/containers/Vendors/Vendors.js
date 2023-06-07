import { useEffect, useState } from "react";
import Vendor from "../../components/Purchase/Vendor";
import axios from "axios";

function Vendors() {
    const [vendors, setVendors] = useState([]);
    const [vendorsLoaded, setLoading] = useState(false);

    useEffect(() => {
            axios.get("https://api.bootcampcentral.com/api/Vendor")
                .then(resp => {
                    setVendors(resp.data);
                    setLoading(true);
                })
                .catch(err => {
                    console.log(`Error: ${err}`);
                });
    }, []);

    /*
        Yo! You've been reading the figma document wrong this entire time. Just load with the vendor call.
        There's a vendor section and an order section. You might not even use the purchasing API.
    */


    return (
        <section>
            {!vendorsLoaded && <h3>Loading...</h3>}
            {vendors && vendors.map(vendor => {

                return (
                    <Vendor 
                        key={vendor.businessEntityId}
                        id={vendor.businessEntityId}
                        name={vendor.vendorName}
                        phone={vendor.contactPhone}
                    />
                );
            })}
        </section>
    );
}

export default Vendors;