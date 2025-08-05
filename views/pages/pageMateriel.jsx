import { Route, Routes } from "react-router-dom"
import MaterielHome from "../components/materiel/home";
import MaterielAdd from "../components/materiel/add";
import MaterielEdit from "../components/materiel/edit";






const PageMateriel = () => {


    return (
        <Routes>
            <Route path="/" element={<MaterielHome />} />
            <Route path="/add" element={<MaterielAdd />} />
            <Route path="/edit/*" element={<MaterielEdit />} />
        </Routes>
    );
}

export default PageMateriel;

