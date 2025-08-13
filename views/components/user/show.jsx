

import { UserAddOutlined } from "@ant-design/icons";
import { Badge, Button, Flex,Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptydataLoad from "../emptydata";
import Datasource from "./datasource";


// definition des colone du tableau d'affichage
const columns = [
    { title: 'Matricule', dataIndex: 'matricule' },
    { title: 'Nom', dataIndex: 'nom' },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Téléphone', dataIndex: 'telephone' },
    { title: '', dataIndex: 'action' },
];


/**
 * composant d'affichage utilisateurs
 */
const UserShow = () => {


    // instantiation de la classe datasource pour les donné d'affichage
    const datasource=new Datasource()
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
            try {

                const fetch = await window.fetch(`${url}/user/show`, {
                    headers: headersHttp,
                    method:"GET",
                    mode:"cors"
                })
                const json = await fetch.json()

                json?.message == "succes" ?
                    setData(json?.data?.data) : setData([])

            } catch (error) {
                           new Error(""+error)


            }
        }
        fechdata()

    }, [data,url])


    return (
        <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
                <Link to="add">
                    <Button type="link" variant="solid"
                        icon={
                            <UserAddOutlined style={{ color: "#000", fontSize: "30px" }} size={50} />
                        } >
                        <Badge overflowCount={9999} style={{ margin: "10px", position: "absolute", left: "50px", top: "0px", width: "100%" }}
                            color="orange" count={data?.length}>
                            <span style={{ fontSize: "20px" }}>Ajouter</span>
                        </Badge>
                    </Button>
                </Link>
            </Flex>
            {
                data.length ?
                    <Table columns={columns} dataSource={datasource.getDatasource(data)} size={[8, 16]}
                        pagination={
                            {
                                defaultPageSize: 7,
                            }
                        } /> :
                    <EmptydataLoad title={"default"} />
            }


        </Flex>
    )


};


export default UserShow

