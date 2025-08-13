import { RightOutlined } from "@ant-design/icons";
import { Card, Layout, Watermark } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormEdit from "./components/FormEdit";

const { Meta } = Card

const MaterielEdit = () => {

    const params = useParams()

    const { "*": materiel } = params

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
    }
    const urlApi = import.meta.env.VITE_API
    const [data, setData] = useState([])

    /** chargement des donné lors de la monté du composant */

    useEffect(() => {
        /** recuperation du materiel */
        const getMateriel = async () => {
            try {
                const query = await window.fetch(`${urlApi}/materiel/edit/${materiel}  `, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await query.json()
                json?.message == "succes" ?
                    setData(json?.data) :
                    setData({})


            } catch (error) {
                new Error("" + error)

                return null
            }

        }

        getMateriel()

    }, [])

    return (<Layout>
        <Card cover={
            <Watermark height={35} width={100} content={"URSA"}>
                <h1>
                    &nbsp;&nbsp;<RightOutlined />&nbsp;{data?.adresse_mac}    </h1>
            </Watermark>}>
            <Meta title={<FormEdit data={data} setData={setData} materiel={materiel} />} />
        </Card>
    </Layout >)

};
export default MaterielEdit