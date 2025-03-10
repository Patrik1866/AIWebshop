import { useParams } from "react-router-dom";
import OrderList from "../components/OrderList";
import "../styles/OrderList.css"
const ViewUserOrder = () => {
    const {userId} = useParams();
 return (
     <>
        <OrderList userId={Number(userId)} ></OrderList>
     </>
 )
    
}

export default ViewUserOrder;