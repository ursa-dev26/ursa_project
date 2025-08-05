import { Route, Routes } from "react-router-dom"
import AgenceHome from "../components/agence/home";
import AgenceAdd from "../components/agence/add";
import AgenceEdit from "../components/agence/edit";




const PageAgence = () => {


    return (
        <Routes>
            <Route path="/" element={<AgenceHome />} />
            <Route path="/add" element={<AgenceAdd />} />
            <Route path="/edit/*" element={<AgenceEdit />} />

        </Routes>
    );
}

export default PageAgence;

