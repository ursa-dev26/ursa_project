

import { UserAddOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptydataLoad from "../emptydata";
import Datasource from "./datasource";

// definitions des colone du tableau d'affectation
const columns = [
    { title: 'Matricule', dataIndex: 'matricule' },
    { title: 'Nom', dataIndex: 'nom' },
    { title: 'Fonction', dataIndex: 'fonction' },
    { title: 'Sanduk', dataIndex: 'agence_libelle' },
    { title: 'Code', dataIndex: 'agence_ref' },
    { title: '', dataIndex: 'action' },
];




const AffectationShow = () => {
    const datasource = new Datasource()

    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    const [data, setData] = useState([])

    useEffect(() => {
        const fechdata = async () => {
            const fetch = await window.fetch(`${url}/affectation/show`,
                {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                }
            )
            const json = await fetch.json()
            json?.message == "succes" ?
                setData(json.data) : setData([])
        }
        fechdata()
    }, [data])







    return (
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
            {
                data.length ?
                    <Table columns={columns} dataSource={datasource.getDatasource(data)} /> : <EmptydataLoad title={"default"} />

            }


        </Flex>
    )


}


export default AffectationShow

