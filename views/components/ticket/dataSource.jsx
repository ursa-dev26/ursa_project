import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Flex,Popconfirm, Space } from "antd";
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
    onDelete = async (code) => {
        try {
            const query = await window.fetch(`${this.url}/ticket/delete/${code}`, {
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

    getfileBy = async (code) => {
        try {
            const query = await window.fetch(`${this.url}/ticket/file/${code}`, {
                headers: this.headersHttp,
                method: "GET",
                mode: "cors"
            })

            const json = await query.json()
            return json
        } catch (error) {
            console.log(error);

            return []

        }

    }

    /**
       * module de telechargement
       */
    download = async (filename) => {

        const headersHttp = {
            Accept: "application/json",
            "Content-type": "application/json",
        }

        try {
            const request = await window.fetch(this.url + "/download/" + filename, {
                headers: headersHttp,
                mode: "cors",
                method: "GET"
            })
            const link = document.createElement('a')
            link.href = request.url
            link.setAttribute("download", filename)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            console.log(error);

        }
    }




    /**
     * display all ticket
     */
    getDatasource = (data) => {
        return data?.map((item, i) => ({
            key: i,
            code: `${item?.code}`,
            titre: `${item?.titre}`,
            nom: `${item?.nom}  ${item?.prenom}`,
            incident: `${item?.incident} `,
            file:
                item?.joinfile ?
                    <ol>
                        {
                            item?.file.map(filename =>

                                <li key={filename} style={{ maxWidth: 150 }}>
                                    <Link to={`/ticket/download?name=${filename}`}  >
                                        <p style={{
                                            wordWrap: "break-word",
                                            textWrap: "wrap"
                                        }}>
                                            {filename}
                                        </p>
                                    </Link>
                                </li>
                            )
                        }

                    </ol> : null,
            agence: `${item?.libelle_agence + " / " + item?.localite_agence}`,
            action:
                item?.status == 0 ?
                    <Flex vertical gap="small">
                        <Flex gap="small" wrap>
                            <Space size="large">
                                <Space.Compact>

                                    <Popconfirm
                                        title={item?.nom + " " + item?.prenom}
                                        onConfirm={() => {
                                            this.onDelete(item?.code)
                                        }}
                                        okText="Oui"
                                        placement="right"
                                        cancelText="Annuler"
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        description={<span>Etes vous sur de vouloir supprimer ?</span>}>
                                        <Button key={`${item?.id} `} icon={<DeleteOutlined style={{ color: "#ff451d" }} size={50} />} />

                                    </Popconfirm>

                                </Space.Compact>
                            </Space>
                        </Flex>
                    </Flex>


                    : <></>





        }))
    }
}

export default DataSource

