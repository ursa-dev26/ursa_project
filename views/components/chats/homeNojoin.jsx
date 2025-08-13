import { Card, Layout } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Discution from "./discution.jsx";
import { useAuth } from '../auth/AuthContext.jsx';
const { Meta } = Card



const ChatSmsNo = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const codeTicket = searchParams.get('code')
    const { isLoggedIn, user } = useAuth();
    const [data, setData] = useState([])

    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await window.fetch(`${url}/ticket/editnojoin/${codeTicket}  `, {
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
                console.log("json");

                new Error("" + error)
                return []
            }
        };
        fetchData()

    }, []);

    return (
        < Layout >
            <Card cover={<Meta
                description={<Discution codeTicket={codeTicket} user={user} infoTicket={data} isLoggedIn={isLoggedIn} />} />

            }>

            </Card>
        </Layout >

    )
}


export default ChatSmsNo;