import CustomerOrderList from "../components/CustomerOrderList";
import { useParams } from "react-router-dom";

const ViewOrdersCustomer = () => {
    const {userId} = useParams();

    return (
        <>
            <CustomerOrderList userId={Number(userId)}></CustomerOrderList>
        </>
    );
}

export default ViewOrdersCustomer;