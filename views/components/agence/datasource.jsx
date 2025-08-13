import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";

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
    onDeleteAgence = async (code) => {

        try {

            const query = await window.fetch(`${this.url}/agence/delete/${code}`, {
                headers: this.headersHttp,
                method: "DELETE",
                mode: "cors"
            })

            const json = await query.json()
            return json

        } catch (error) {
            new Error(""+error)
            return null

        }

    }
    /**
     * display all datasource from agence
     */
    getDatasource = (data) => {
        return data.map((val, i) => ({
            key: i,
            code: `${val?.code}`,
            libelle: `${val?.libelle}`,
            localite: `${val.localite}`,
            action: <Flex vertical gap="small">
                <Flex gap="small" wrap>
                    <Space size="large">
                        <Space.Compact>
                            <Link to={`edit/${val?.code}`}  >
                                <Button icon={<EditOutlined style={{ color: "#1d8bff" }} size={50} />} />
                            </Link>

                            <Popconfirm
                                title={val?.code + " / " + val?.libelle}
                                onConfirm={() => {
                                    this.onDeleteAgence(val?.code)
                                }}
                                okText="oui"
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
        }));
    }

}
export default Datasource