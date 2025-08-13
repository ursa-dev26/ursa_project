import { Avatar, Button, Col, Flex, Form, Input, Row, Typography, Skeleton, Watermark, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MailTwoTone, PaperClipOutlined, SendOutlined, SwapLeftOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bubble } from "@ant-design/x";
import isValuePresent from "../validate";
import StringTo from "../stringTo";
const { Paragraph } = Typography




const Discution = ({ codeTicket, infoTicket, user, isLoggedIn }) => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [items, setItems] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [message, setmessage] = useState("");
    const [discution, setDiscution] = useState([]);




    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    /**
    *@function  fetchData()
    * introduit les ticket sur la liste infinitescrolle
    */
    const fetchData = async () => {
        if (data.length > 0) {
            setItems([...items, data]);
            setPage(page + 1);

        } else {
            setHasMore(false);
        }

    };

    // Chat messages

    const roles = {
        interlocuteur: {
            style: { maxWidth: 600 },
            placement: 'start',
            avatar: { icon: <UserOutlined />, style: { background: '#f17034ff' } },
        },
        locuteur: {
            style: { maxWidth: 600 },
            placement: 'end',
            avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
        },
    };

    const handleChange = (e) => {
        const { value } = e.target
        setmessage(value)

    }

    /**
    *@function saveDicution() 
    */
    const saveDicution = async (data) => {
        try {
            const request = await window.fetch(`${url}/discution/add`, {
                headers: headersHttp,
                body: JSON.stringify(data),
                method: "POST",
                mode: "cors"
            })

            const json = await request?.json()


            return json
        } catch (error) {
            new Error("" + error)
            return null
        }

    }
    /**
     *@function  updateStatusTicket()
     * mis a jour du status
     */
    const updateStatusTicket = async (element) => {


        try {
            const fetch = await window.fetch(`${url}/ticket/update/${element}`, {
                headers: headersHttp,
                body: JSON.stringify({
                    "status": 2
                }),
                method: "PATCH",
                mode: "cors"
            })
            const json = await fetch.json()
            console.log("je suis appele", json);

            return json
        } catch (error) {

            new Error("err" + error);

            return null
        }

    }

    /**
     *@function onFinish() 
     */

    const onFinish = () => {

        saveDicution(
            {
                commentaire: message,
                ticket_ref: codeTicket,
                affectation_ref: user?.id
            })
        setmessage(null)

        infoTicket?.map((val) => {
            if (val?.status == 1) {
                updateStatusTicket(codeTicket)

            }
        })
    }


    useEffect(() => {
        const showsms = async () => {
            try {
                const query = await window.fetch(`${url}/discution/show/${codeTicket}`, {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                })
                const json = await query.json()
                if (isValuePresent(json?.data)) {
                    setDiscution(json?.data)

                }

                return json
            } catch (error) {
                new Error("" + error)
                return null
            }
        }



        showsms()
    }, [discution]);

    const warningSms = "A titre d'attention! Le tickets ne sera pris en charge que si des traitement ont été detecté par le systeme. Merci !"

    return (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/assignation", { replace: true })}
                    icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                    <span style={{ fontSize: "20px" }}>Précédent</span>
                </Button>
            </Flex>



            <div style={{
                filter: "blur(0.2px)",
                borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center",
            }}>

                {/**
               * 
                                <SpeechButton />
               * 
               */}
                <Watermark content={""} style={{
                    width: "300rem", background: "#d6d5d513", border: "1px solid transparent",
                    borderRadius: "30px"
                }}>

                    <Row>

                        <Col xs={24} sm={24} md={24} lg={16}>
                            <InfiniteScroll
                                initialScrollY={450}
                                next={fetchData}
                                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                hasMore={hasMore}
                                height={450}
                                style={{ marginBottom: "3rem", padding: "5rem" }}
                                dataLength={data?.length}>

                                <Bubble.List
                                    roles={roles}
                                    items={discution.map((value, index) => ({
                                        key: index,
                                        role: value?.id == user?.id ? 'locuteur' : 'interlocuteur',
                                        content: <Paragraph style={{
                                            width: 400,
                                            textWrap: "wrap",
                                            fontSize: "12px",
                                            fontFamily: "monospace | serif "
                                        }}
                                            ellipsis={{ rows: 3, expandable: true, symbol: 'voir plus' }}   >
                                            <span style={{
                                                position: "absolute",
                                                margin: "1px",
                                                padding: "1px",
                                                border: "1px solid white",
                                                borderRadius: "15rem",
                                                justifyContent: "center",
                                                top: "-0.5rem",
                                                left: value?.id != user?.id ? "0px" : "",
                                                right: value?.id == user?.id ? "0px" : "",
                                                lineHeight: "1rem",
                                                background: isLoggedIn && value?.id == user?.id ? "#ffffffff" : "#ffffffff"
                                            }}>
                                                {value?.id == user?.id ?
                                                    StringTo.upercase(user?.nom) + " " + StringTo.ucfirst(user?.prenom) :
                                                    StringTo.upercase(value?.nom) + " " + StringTo.ucfirst(value?.prenom)
                                                } <br />
                                            </span>
                                            <div style={{ fontFamily: "cursive | monospace ", fontSize: "16px" }}>
                                                {value?.commentaire}

                                            </div>
                                            <br />
                                            <span style={{
                                                position: "absolute",
                                                margin: "1px",
                                                padding: "1px",
                                                border: "0px solid white",
                                                borderRadius: "15rem",
                                                justifyContent: "right",
                                                alignItems: "end",
                                                bottom: "-1px",
                                                right: value?.id != user?.id ? "0px" : "",
                                                left: value?.id == user?.id ? "0px" : "",
                                                lineHeight: "1rem",
                                                background: isLoggedIn && value?.id == user?.id ? "#ffffffff" : "#ffffffff"
                                            }}>
                                                {
                                                    new Date(value?.date_envoie).toUTCString()
                                                }
                                            </span>
                                        </Paragraph>,
                                    }))}
                                />

                            </InfiniteScroll>
                            <Flex align="center" style={{
                                justifyContent: "center",
                                position: "relative",
                                top: "-2rem"
                            }} >

                                <Form
                                    style={{ maxWidth: "100rem", width: "30rem" }}
                                    onFinish={onFinish}
                                    labelCol={{ span: 0 }}
                                    wrapperCol={{ span: 24 }}>
                                    <Form.Item label={null}>
                                        <Input value={message} placeholder="Sms"
                                            onChange={handleChange} prefix={<MailTwoTone />}
                                            size={50} style={{
                                                border: "3px solid #9b8b8b5e",
                                                textAlign: "center",
                                                alignContent: "center",
                                                borderRadius: "30px",
                                            }}

                                            suffix={<Avatar style={{ background: "green" }} icon={
                                                <Button htmlType="submit" type="link">
                                                    <SendOutlined style={{
                                                        fontSize: "12px",
                                                        color: "white"
                                                    }} />
                                                </Button>

                                            } />} />
                                    </Form.Item>
                                </Form>

                            </Flex>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8}>
                            <div style={{ display: "block", padding: "10px", margin: "2rem", fontFamily: "monospace", fontSize: "15px" }}>
                                {
                                    infoTicket?.map((val, ind) => {
                                        return <>

                                            {


                                                val?.status == 1 ?
                                                    <Paragraph key={"info" + ind}
                                                        style={{
                                                            border: "1px solid transparent",
                                                            borderRadius: "15px",
                                                            background: "#cbfd7ba8",
                                                            margin: "1rem",
                                                            padding: "0.2rem"
                                                        }}
                                                        ellipsis={{ tooltip: warningSms, rows: 3 }} >
                                                        {warningSms}

                                                    </Paragraph> : <> </>

                                            }
                                            < div style={{ display: "flex", gap: 3 }}>




                                                <div>Etat du ticket:&nbsp;&nbsp;</div>
                                                <div> <Badge key={"codet" + ind} count={
                                                    val?.status == 1 ? "Assigné" :
                                                        val?.status == 2 ? "Encours de traitement" :
                                                            val?.status == 3 ? "Fin de traitement" : "Non assigné"


                                                } /></div>
                                            </div>
                                            < div style={{ display: "flex", gap: 3 }}>
                                                <div>Code du ticket:&nbsp;&nbsp;</div>
                                                <div> <Badge key={"codet" + ind} count={codeTicket} /></div>
                                            </div>

                                            <div style={{ display: "flex", gap: "3px", marginTop: "2px" }}>
                                                <div>Titre:&nbsp;&nbsp;</div>
                                                <div style={{ fontStyle: "oblique", fontWeight: "bold" }}>{val?.titre} </div>
                                            </div>

                                            <div style={{ display: "flex", gap: "3px", marginTop: "2px" }}>
                                                <div>Nom et prenom:&nbsp;&nbsp;</div>
                                                <div style={{ fontStyle: "oblique", fontWeight: "bold" }}>
                                                    {StringTo.upercase(val?.nom) + " " + StringTo.ucfirst(val?.prenom)} </div>
                                            </div>
                                            <div style={{ display: "block", gap: "3px", marginTop: "2px" }}>
                                                <div>Piece jointe :</div>
                                                <div>
                                                    {
                                                        val?.file.map(files => {
                                                            return <Link to={`/ticket/download?name=${encodeURIComponent(files)}`}  >
                                                                <Paragraph style={{ maxWidth: 250, color: "blue" }}
                                                                    ellipsis={{
                                                                        rows: 1,
                                                                        expandable: true,
                                                                        tooltip: files,
                                                                        symbol: <PaperClipOutlined style={{ fontSize: "20px" }} />
                                                                    }}>
                                                                    {files}
                                                                </Paragraph>
                                                            </Link>
                                                        })
                                                    }
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", gap: "3px", marginTop: "2px" }}>
                                                <div>Agence:&nbsp;&nbsp;</div>
                                                <div style={{ fontStyle: "oblique", fontWeight: "bold" }}>
                                                    {val?.code_agence + " (" + val?.libelle_agence + " " + val?.localite_agence + " )"} </div>
                                            </div>
                                        </ >

                                    })
                                }

                            </div>
                        </Col>

                    </Row>

                </Watermark>
            </div >

        </Flex >
    );

};


export default Discution