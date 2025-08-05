import { Routes,Route } from "react-router-dom";
import TicketHome from "../components/ticket/home"
import TicketAdd from "../components/ticket/add";
import PageDownload from "./pageDownload";


const PageTicket=()=>{

    return (
        <Routes>
            <Route path="/" element={<TicketHome />} />
            <Route path="/add" element={<TicketAdd />} />
          <Route path="/download/*" element={<PageDownload />} />

        </Routes>
    )
    
}
 
export default PageTicket;