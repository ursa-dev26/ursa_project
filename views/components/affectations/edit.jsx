import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Layout, Spin, Watermark } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditAffectation from "./components/FormEdit";
const { Meta } = Card


const AffectationEdit = () => {
    const params = useParams()

    const { "*": matricule } = params
    const [affectation, setAffectation] = useState({})
    const [user, setUser] = useState([])
    const [agence, setAgence] = useState([])
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
    }
    const urlApi = import.meta.env.VITE_API


    /** chargement des donné lors de la monté du composant */

    useEffect(() => {
        /** recupere toute les utilisateur */
        const getOneAffectation = async () => {
            try {
                const query = await window.fetch(`${urlApi}/affectation/edit/${matricule}  `, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await query.json()
                json?.message == "succes" ?
                    setAffectation(json?.data[0] ) :
                    setAffectation({})


            } catch (error) {
                console.log(error);
                return null
            }

        }
        /** recupere toute les utilisateur */
        const getAllUser = async () => {
            try {
                const query = await window.fetch(`${urlApi}/user/show `, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await query.json()
                setUser(json?.data?.data)
                return json
            } catch (error) {
                console.log(error);
                return null
            }

        }

        /** recupere toute les agences */
        const getAllAgence = async () => {
            try {
                const query = await window.fetch(`${urlApi}/agence/show`, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await query.json()
                setAgence(json?.data)
                return json
            } catch (error) {
                console.log(error);
                return null
            }

        }
        return () => {
            getAllUser()
            getAllAgence()
            getOneAffectation()
        }
    }, [])


    return affectation?.user_ref ? (
        < Layout >
            <Card cover={
                <Watermark height={35} width={100} content={"URSA"}>
                    <h1>
                        &nbsp;&nbsp;<RightOutlined />&nbsp;{affectation.matricule+" / "+affectation.nom+" "+affectation.prenom}    </h1>
                </Watermark>}>
                <Meta title={<EditAffectation affectation={affectation} setAffectation={setAffectation}  agence={agence} user={user} />} />
            </Card>
        </Layout >
    ):
    <>
            <div style={{
                height: "50vh", alignItems: "center",
                position: "relative", left: "10rem",
                alignContent: "center"
            }} >
                <Spin indicator={<LoadingOutlined style={{ fontSize: 68 }} spin />} />
            </div>
    
        </>
}


export default AffectationEdit;
