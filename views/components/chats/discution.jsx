import { Avatar, Button, Col, Flex, Form, Input, Row, Select, Skeleton, Watermark } from "antd";
import { useNavigate } from "react-router-dom";
import { MailTwoTone, SendOutlined, SwapLeftOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bubble } from "@ant-design/x";



const Discution = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [items, setItems] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [message, setmessage] = useState("");

    const [array_message, setArray_Messages] = useState([{
        status: 'interlocuteur',
        sms: "je suis un locuteur bien administre et je veux demande le compte de tontine",
    }])

    const urlApi = import.meta.env.VITE_API

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
            avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
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
     *@function onFinish() 
     */

    const onFinish = () => {
        setArray_Messages([...array_message, {
            status: "locuteur",
            sms: message,
        }])

        setmessage(null)

    }

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
                <Watermark content={"URSA"}>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                            <InfiniteScroll
                            initialScrollY={450}
                                next={fetchData}
                                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                hasMore={hasMore}
                                height={450}
                                dataLength={data?.length}>
                                <Row style={{
                                    marginBottom: "3rem"
                                }}>
                                    <Col xs={24} sm={24} md={24} lg={24}>

                                        <Bubble.List
                                            paragraph={{ rows: 1 }}
                                            roles={roles}

                                            items={array_message.map(({ id, sms, status }) => ({
                                                key: id,
                                                role: status === 'locuteur' ? 'locuteur' : 'interlocuteur',
                                                content: <div style={{
                                                }}>
                                                    {sms} </div>,
                                            }))}
                                        />

                                    </Col>
                                </Row>



                            </InfiniteScroll>
                        </Col>

                    </Row>

                </Watermark>





            </div >
            <Flex align="center" style={{
                justifyContent:"center",
                position:"relative",
                top:"-2rem"
            }  } >

                <Form
                style={{maxWidth:"100rem",}  }
                    onFinish={onFinish}
                    labelCol={{ span: 0}}
                    wrapperCol={{ span: 24 }}>
                    <Form.Item label={null}>
                        <Input value={message} placeholder="Sms"
                            onChange={handleChange} prefix={<MailTwoTone />}
                            size={25} style={{
                                border: "0px solid transparent",
                                textAlign: "center",
                                
                                alignContent: "center",
                                borderRadius: "30px"
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
        </Flex >
    );

};


export default Discution