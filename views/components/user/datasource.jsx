import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons"
import { Button, Flex, Popconfirm, Space } from "antd"
import { Link } from "react-router-dom"

class Datasource {

    constructor() { }
    url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    /** suppression d'un utilisateur */
    onDeleteUser = async (matricule) => {

        try {

            const query = await window.fetch(`${this.url}/user/delete/${matricule}`, {
                headers: this.headersHttp,
                method: "DELETE",
                mode: "cors"
            })

            await query.json()
        } catch (error) {
           return new Error("" + error)
        }

    }

    getDatasource = (data) => {
        return data?.map((val, i) => ({
            key: i,
            matricule: val.matricule,
            nom: `${val.nom} ${val.prenom}`,
            role: `${val.role}`,
            telephone: `${val.telephone}`,
            action: <Flex vertical gap="small">
                <Flex gap="small" wrap>


                    <Space size="large">
                        <Space.Compact>
                            <Link to={`edit/${val?.matricule}`}  >
                                <Button icon={<EditOutlined style={{ color: "#1d8bff" }} size={50} />} />
                            </Link>

                            <Popconfirm
                                title={val?.nom + " " + val?.prenom}
                                onConfirm={() => {
                                    this.onDeleteUser(val?.matricule)
                                }}
                                okText="Oui"
                                placement="right"
                                cancelText="Annuler"
                                icon={<UserAddOutlined style={{ color: 'red' }} />}
                                description={<span>Etes vous sur de vouloir supprimer ?  </span>}
                            >
                                <Button key={`${i} `} icon={<DeleteOutlined style={{ color: "#ff451d" }} size={50} />} />

                            </Popconfirm>

                        </Space.Compact>
                    </Space>


                </Flex>
            </Flex>,
        }))
    }

};


export default Datasource