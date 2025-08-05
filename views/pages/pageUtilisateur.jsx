import { Routes, Route } from "react-router-dom";
import Userhome from "../components/user/home.jsx";
import UserAdd from "../components/user/add.jsx";
import UserEdit from "../components/user/edit.jsx";




const PageUser = () => {




    return (
        <Routes>
            <Route path="/" element={<Userhome />} />
            <Route path="/add" element={<UserAdd />} />
            <Route path="/edit/*" element={<UserEdit />} />
        </Routes>
    )

}

export default PageUser;