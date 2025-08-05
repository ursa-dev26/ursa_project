import Layout from "../components/Layout.jsx"
import { Routes, Route } from "react-router-dom"
import PageUser from "../pages/pageUtilisateur.jsx"
import PageAgence from "../pages/pageAgence.jsx"
import PageAffectation from "../pages/pageAffectation.jsx"
import PageTicket from "../pages/pageTicket.jsx"
import PageAssignation from "../pages/pageAssignation.jsx"
import PageMateriel from "../pages/pageMateriel.jsx"
import PageTransaction from "../pages/pageTransaction.jsx"
import Authentification from "../components/auth/auth.jsx"
import { AuthProvider } from "../components/auth/AuthContext.jsx"
import LogOut from "../components/auth/logout.jsx"
import PrivateRoute from "../components/protectedRoute.jsx"
const App = () => {





  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/login" element={<Authentification />} />
          <Route path="/logout" element={<LogOut />} />

          <Route element={<PrivateRoute />} >
            <Route path="/" element={<h1>Bien venue</h1>} />

            <Route path="user/*" element={<PageUser />} />
            <Route path="agence/*" element={<PageAgence />} />
            <Route path="affectation/*" element={<PageAffectation />} />
            <Route path="ticket/*" element={<PageTicket />} />
            <Route path="assignation/*" element={<PageAssignation />} />
            <Route path="materiel/*" element={<PageMateriel />} />
            <Route path="transaction/*" element={<PageTransaction />} />
          </Route>


          <Route path="*" element={<h1> 404 page not found </h1>} />
        </Routes>
      </Layout>
    </AuthProvider>

  )
}


export default App
