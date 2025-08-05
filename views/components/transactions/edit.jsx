import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, Layout, Watermark } from "antd"
import { RightOutlined } from "@ant-design/icons"
import FormEdit from "./components/FormEdit"
const { Meta } = Card


const TransactionEdit = () => {
    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }
    const params = useParams()
    const { "*": id } = params
    const [transaction, setTransaction] = useState({})
    const [agence, setAgence] = useState([])
    const [materiel, setMateriel] = useState([])



    /**
     * component didmount
     */

    useEffect(() => {
        const fetchdata = async () => {
            const query = await window.fetch(`${url}/transaction/edit/${id} `, {
                headers: headersHttp,
                method: "GET",
                mode: "cors"
            })
            const json = await query.json()
            json?.message == "succes" ?
                json?.data.map(item => {
                    setTransaction({
                        qté: item?.qté,
                        objet: item?.objet,
                        agence_ref: item?.agence_ref,
                        materiel_ref: item?.materiel_ref
                    })
                }) :
                setTransaction({})
        }

        /**
         * recupere toute les agence disponible
         */
        const getAllAgence = async () => {
            try {
                const request = await window.fetch(`${url}/agence/show`, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await request?.json()
                setAgence(json?.data)
                return json
            } catch (error) {
                console.log(error);

                return []
            }
        };
        /**
         * recupere toute les materiel dispo
         */
        const getAllMateriel = async () => {
            try {
                const request = await window.fetch(`${url}/materiel/show`, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await request?.json()
                setMateriel(json?.data)
                return json

            } catch (error) {
                console.log(error);

                return []
            }

        };

            getAllAgence()
            getAllMateriel()
            fetchdata()
            
    }, []);


    return (
        < Layout >
            <Card cover={
                <Watermark height={35} width={100} content={"URSA"}>
                    <h1>
                        &nbsp;&nbsp;<RightOutlined />&nbsp;&nbsp;Transaction num: {id} </h1>
                </Watermark>}>
                <Meta title={<FormEdit transaction={transaction} setTransaction={setTransaction} agence={agence} materiel={materiel} id={id} />} />
            </Card>
        </Layout >

    )

}

export default TransactionEdit