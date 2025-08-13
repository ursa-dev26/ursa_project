import { DeleteOutlined, PaperClipOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import StringTo from "../stringTo";

const { Paragraph, Text } = Typography



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
            new Error("" + error)
            return null
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
            new Error("" + error)

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
            new Error("" + error)


        }
    }




    /**
     * display all ticket
     */
    getDatasource = (data) => {
        return data?.map((item, i) => ({
            key: i,
            code: StringTo.upercase(item?.code),
            titre: <div style={{maxWidth:200} }>
                <Paragraph ellipsis={{ rows: 1, 
                    expandable: true,
                    tooltip:item?.titre,
                     symbol: <PaperClipOutlined style={{ fontSize: "20px" }} /> }}>
                    {item?.titre}
                </Paragraph>
            </div>,
            nom: `${item?.nom}  ${item?.prenom}`,
            file:
                item?.joinfile ?
                    <ol>
                        {
                            item?.file.map(filename =>
                                < li key={filename} >
                                    <Link to={`/ticket/download?name=${encodeURIComponent(filename)}`}  >
                                        <Paragraph style={{ maxWidth: 250 }}
                                            ellipsis={{
                                                rows: 1,
                                                expandable: true,
                                                tooltip: filename,
                                                symbol: <PaperClipOutlined style={{ fontSize: "20px" }} />
                                            }}  >
                                            {filename}
                                        </Paragraph>

                                    </Link>
                                </li>


                            )
                        }

                    </ol> : null,
            agence: item?.libelle_agence + " (" + StringTo.upercase(item?.localite_agence) + " )",
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

