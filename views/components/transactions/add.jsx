import { Card, Layout, Watermark } from "antd";
import { RightOutlined } from "@ant-design/icons";
import FormAdd from "./components/FormAdd";
import { useEffect, useState } from "react";
const { Meta } = Card


const TransactionAdd = () => {
    const [agence, setAgence] = useState([])
    const [materiel, setMateriel] = useState([])

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
    }
    const urlApi = import.meta.env.VITE_API

    /**
     * component didmount
     */

    useEffect(() => {

        /**
         * recupere toute les agence disponible
         */
        const getAllAgence = async () => {
            try {
                const request = await window.fetch(`${urlApi}/agence/show`, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await request?.json()
                setAgence(json?.data)
                return json
            } catch (error) {
                new Error("" + error)


                return []
            }
        };
        /**
         * recupere toute les materiel dispo
         */
        const getAllMateriel = async () => {
            try {
                const request = await window.fetch(`${urlApi}/materiel/show`, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await request?.json()
                setMateriel(json?.data)
                return json

            } catch (error) {
                new Error("" + error)


                return []
            }

        };

        return () => {
            getAllAgence()
            getAllMateriel()
        }
    }, []);

    return (

        <>
            <Layout>
                <Card cover={
                    <Watermark height={35} width={100} content={"URSA"}>
                        <h1>
                            &nbsp;&nbsp;<RightOutlined />Transaction des materiels URSA</h1>
                    </Watermark>}>
                    <Meta title={<FormAdd agence={agence} materiel={materiel} />} />
                </Card>
            </Layout>

        </>

    )
}

export default TransactionAdd;