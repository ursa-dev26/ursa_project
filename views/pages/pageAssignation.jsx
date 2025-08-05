import { Routes,Route } from "react-router-dom";
import AssignationAdd from "../components/assignation/add";
import AssignationHome from "../components/assignation/home";
import ChatSms from "../components/chats/home";



const PageAssignation=()=>{
    return (
        <Routes>
            <Route path="/" element={<AssignationHome />} />
            <Route path="/add" element={<AssignationAdd />} />
            <Route path="/commentaire/*"element={<ChatSms  />} />
        </Routes>
    )
}
 
export default PageAssignation;