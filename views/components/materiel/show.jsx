import { UserAddOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Table } from "antd";
import { Link } from "react-router-dom";
import EmptydataLoad from "../emptydata";
import { useEffect, useState } from "react";
import Datasource from "./datasource";


const columns = [
    { title: 'Adresse Mac', dataIndex: 'adresse_mac' },
    { title: "Numero de serie", dataIndex: 'serial_number' },
    { title: 'Libelle', dataIndex: 'libelle' },
    { title: 'Mise en service', dataIndex: 'date_mise_service' },
    { title: 'Etat', dataIndex: 'etat' },
    { title: '', dataIndex: 'action' },
];


const Materielshow = () => {


    const DataSrc = new Datasource()
    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    /** declaration des etat locales */

    const [data, setData] = useState([])

    /** gestion des cycle d'activité des composant */

    useEffect(() => {
        const fechdata = async () => {
            try {

                const fetch = await window.fetch(`${url}/materiel/show`, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await fetch.json()

                json?.message == "succes" ?
                    setData(json.data) : setData([])
            } catch (error) {
                console.log(error);
            }
        }
        return () => {
            fechdata()
        }

    }, [data])

    return data.length ? (
        <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
                <Link to="add">
                    <Button type="link" variant="solid"
                        icon={<UserAddOutlined style={{ color: "#000", fontSize: "30px" }} size={50} />} >
                        <Badge overflowCount={9999} style={{ margin: "10px", position: "absolute", left: "50px", top: "0px", width: "100%" }}
                            color="orange" count={data?.length}>

                            <span style={{ fontSize: "20px" }}>Ajouter</span>

                        </Badge>



                    </Button>
                </Link>
            </Flex>
            <Table columns={columns} dataSource={DataSrc.getDatasource(data)}

                pagination={
                    {
                        defaultPageSize: 7,
                    }
                } size={"small"} />
        </Flex>
    ) :
        <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
                <Link to="add">
                    <Button type="link" variant="solid"
                        icon={<UserAddOutlined style={{ color: "#000", fontSize: "30px" }} size={50} />} >
                        <span style={{ fontSize: "20px" }}>Ajouter</span>
                    </Button>
                </Link>
            </Flex>
            <EmptydataLoad title={"default"} />
        </Flex>

};

export default Materielshow