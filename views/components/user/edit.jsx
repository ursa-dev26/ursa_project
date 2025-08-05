import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Layout, Spin, Watermark } from "antd";
import FormEdit from "./components/FormEdit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StringTo from "../stringTo";
const { Meta } = Card


const UserEdit = () => {
    const params = useParams()
    const [user, setUser] = useState({})

    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }


    const { "*": matricule } = params

    useEffect(() => {
        const fetchdata = async () => {
            const query = await window.fetch(`${url}/user/edit/${matricule} `, {
                headers: headersHttp,
                method: "GET",
                mode: "cors"
            })
            const json = await query.json()

            json?.message == "succes" ?
                setUser(json?.data) :
                setUser({})
        }
        fetchdata()
    }, [])

    return user.matricule ? (
        < Layout >
            <Card cover={
                <Watermark height={35} width={100} content={"URSA"}>
                    <h1>
                        &nbsp;&nbsp;<RightOutlined />&nbsp;&nbsp;{StringTo.upercase(user?.nom)   + " " + StringTo.ucfirst(user?.prenom)}    </h1>
                </Watermark>}>
                <Meta title={<FormEdit user={user} setUser={setUser} />} />
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


export default UserEdit;