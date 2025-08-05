import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Layout, Spin, Watermark } from "antd";
import FormEdit from "./components/FormEdit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const { Meta } = Card


const AgenceEdit = () => {
    const params = useParams()

    const { "*": code } = params
    const [agence, setAgence] = useState({})

    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    useEffect(() => {
        const fetchdata = async () => {
            const query = await window.fetch(`${url}/agence/edit/${code} `, {
                headers: headersHttp,
                method: "GET",
                mode: "cors"
            })
            const json = await query.json()

            json?.message == "succes" ?
                setAgence(json?.data) :
                setAgence({})
        }
        fetchdata()
    }, [code])

    return agence?.code ? (
        < Layout >
            <Card cover={
                <Watermark height={35} width={100} content={"URSA"}>
                    <h1>
                        &nbsp;&nbsp;<RightOutlined />&nbsp;&nbsp;{agence?.code + " / " + agence?.libelle +" "+agence.localite}  </h1>
                </Watermark>}>
                <Meta title={<FormEdit agence={agence} setAgence={setAgence} />} />
            </Card>
        </Layout >

    ) :
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


export default AgenceEdit;