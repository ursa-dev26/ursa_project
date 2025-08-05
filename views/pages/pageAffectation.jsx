import { Route, Routes } from "react-router-dom"
import AffectationHome from "../components/affectations/home";
import AffectationAdd from "../components/affectations/add";
import AffectationEdit from "../components/affectations/edit";





const PageAffectation = () => {


    return (
        <Routes>
            <Route path="/" element={<AffectationHome />} />
            <Route path="/add" element={<AffectationAdd />} />
            <Route path="/edit/*" element={<AffectationEdit />} />
        </Routes>
    );
}

export default PageAffectation;

