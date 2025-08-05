import { Routes,Route } from "react-router-dom";
import TransactionAdd from "../components/transactions/add";
import TransactionHome from "../components/transactions/home";
import TransactionEdit from "../components/transactions/edit";


const PageTransaction=()=>{

    return (
        <Routes>
            <Route path="/" element={<TransactionHome />} />
            <Route path="/add" element={<TransactionAdd />} />
            <Route path="/edit/*"element={<TransactionEdit />} />
        </Routes>
    )
    
}
 
export default PageTransaction;