import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";



class DataSource {

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
            const query = await window.fetch(`${this.url}/transaction/delete/${id}`, {
                headers: this.headersHttp,
                method: "DELETE",
                mode: "cors"
            })

            const json = await query.json()
            return json
        } catch (error) {
            console.log(error);

            console.log({ "erreur": error });

        }

    }


    getDatasource = (data) => {
        return data?.map((item, i) => ({
            key: i,
            qté: `${item?.qté}`,
            objet: `${item?.objet}`,
            agence_ref: `${item?.agence_ref}`,
            materiel_ref: `${item?.materiel_ref}`,
            action: <Flex vertical gap="small">
                <Flex gap="small" wrap>
                    <Space size="large">
                        <Space.Compact>
                            <Link to={`edit/${item?.id}`}  >
                                <Button icon={<EditOutlined style={{ color: "#1d8bff" }} size={50} />} />
                            </Link>

                            <Popconfirm
                                title={item?.objet + " " + item?.materiel_ref}
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
}

export default DataSource

