import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
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
    onDeleteUser = async (id) => {

        try {

            const query = await window.fetch(`${this.url}/affectation/delete/${id}`, {
                headers: this.headersHttp,
                method: "DELETE",
                mode: "cors"
            })

            const json = await query.json()
            console.log(json);


        } catch (error) {
            console.log({ "erreur": error });

        }

    }

    /** 
     * display all data from affectation
     */
    getDatasource = (data) => {
        return data.map((val, i) => ({
            key: i,
            matricule: `${val.user_ref}`,
            nom: `${val.nom} ${val.prenom}`,
            fonction: `${val.fonction} `,
            agence_libelle: `${val.agence_ref}`,
            agence_ref: `${val.agence_ref}`,
            action: <Flex vertical gap="small">
                <Flex gap="small" wrap>


                    <Space size="large">
                        <Space.Compact>
                            <Link to={`edit/${val.user_ref}`}  >
                                <Button icon={<EditOutlined style={{ color: "#1d8bff" }} size={50} />} />
                            </Link>

                            <Popconfirm
                                title={val?.nom + " " + val?.prenom}
                                onConfirm={() => {
                                    this.onDeleteUser(val?.id)
                                }}
                                okText="Oui"
                                placement="right"
                                cancelText="Annuler"
                                icon={<UserOutlined style={{ color: 'red' }} />}
                                description={<span>Etes vous sur de vouloir supprimer ? </span>}
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