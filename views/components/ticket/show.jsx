

import { UserAddOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Table } from "antd";
import { Link } from "react-router-dom";
import EmptydataLoad from "../emptydata";
import { useEffect, useState } from "react";
import DataSource from "./dataSource";


const columns = [
    { title: 'Code', dataIndex: 'code' },
    { title: "Titre", dataIndex: 'titre' },
    { title: 'Nom et Prenom', dataIndex: 'nom' },
    { title: 'File(s)', dataIndex: 'file' },
    { title: 'Agence', dataIndex: 'agence' },
    { title: null, dataIndex: 'action' },
];


const TicketShow = () => {

    const DataSrc = new DataSource()
    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    /** declaration des etat locales */

    const [data, setData] = useState([])
    const [dataJoin, setDataJoin] = useState([])
    /** gestion des cycle d'activité des composant */





    useEffect(() => {

        const fetchData = async () => {
            try {
                const request = await window.fetch(`${url}/ticket/nojoin `, {
                    headers: headersHttp,
                    mode: "cors",
                    method: "GET"
                })
                const json = await request?.json()

                if (json?.message == "succes") {
                    setData(json?.data)
                    return json?.data
                } else {
                    return []
                }
            } catch (error) {
                new Error("" + error)


                return []
            }
        };

        const fetchDataJoin = async () => {
            try {
                const request = await window.fetch(`${url}/ticket/join `, {
                    headers: headersHttp,
                    mode: "cors",
                    method: "GET"
                })
                const json = await request?.json()

                if (json?.message == "succes") {
                    setDataJoin(json?.data)

                    return json?.data
                } else {
                    return []
                }
            } catch (error) {
                new Error("" + error)

                return []
            }
        };


        fetchData()
        fetchDataJoin()
    }, []);



    return data.concat(dataJoin).length ? (
        <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
                <Link to="add">
                    <Button type="link" variant="solid"
                        icon={<UserAddOutlined style={{ color: "#000", fontSize: "30px" }} size={50} />} >

                        <Badge overflowCount={9999} style={{ margin: "10px", position: "absolute", left: "50px", top: "0px", width: "100%" }}
                            color="orange" count={data.concat(dataJoin)?.length}>
                            <span style={{ fontSize: "20px" }}>Ajouter</span>
                        </Badge>
                    </Button>
                </Link>
            </Flex>
            <Table columns={columns} dataSource={DataSrc.getDatasource(data.concat(dataJoin))}
                expandable={{
                    expandedRowRender: record => {

                        return record.file != null ? <div style={{ wordWrap: "normal", textWrap: "nowrap" }} >
                            <span>Piece jointe</span>{record.file}
                        </div> :

                            <p style={{ margin: 0 }}>{record.file}</p>
                    },
                    rowExpandable: record => {

                        return record.titre !== 'Not Expandable'
                    },
                }}


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


export default TicketShow

