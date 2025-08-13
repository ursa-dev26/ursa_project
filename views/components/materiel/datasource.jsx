import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { Button, Flex, Popconfirm, Space } from "antd"
import { Link } from "react-router-dom"

class Datasource {

    constructor() {


    }

    url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    /** suppression d'un utilisateur */
    onDelete = async (id) => {
        try {
            const query = await window.fetch(`${this.url}/materiel/delete/${id}`, {
                headers: this.headersHttp,
                method: "DELETE",
                mode: "cors"
            })
            const json = await query.json()
            return json
        } catch (error) {

            new Error("" + error)


        }

    }

    /** retrourne une rendue d'items */

    getDatasource = (data) => {
        return data?.map((item, i) => ({
            key: i,
            adresse_mac: `${item?.adresse_mac}`,
            serial_number: `${item?.serial_number}`,
            libelle: `${item?.libelle}`,
            date_mise_service: `${item?.date_mise_service}`,
            etat: `${item?.etat} `,
            action: <Flex vertical gap="small">
                <Flex gap="small" wrap>
                    <Space size="large">
                        <Space.Compact>
                            <Link to={`edit/${item?.id}`}  >
                                <Button icon={<EditOutlined style={{ color: "#1d8bff" }} size={50} />} />
                            </Link>

                            <Popconfirm
                                title={item?.adresse_mac}
                                onConfirm={() => {
                                    this.onDelete(item?.id)
                                }}
                                okText="Oui"
                                placement="right"
                                cancelText="Annuler"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                description={<span>Etes vous sur de vouloir supprimer ?</span>}
                            >
                                <Button key={`${item?.id} `} icon={<DeleteOutlined style={{ color: "#ff451d" }} size={50} />} />

                            </Popconfirm>

                        </Space.Compact>
                    </Space>


                </Flex>


            </Flex>,
        }))
    }

};

export default Datasource