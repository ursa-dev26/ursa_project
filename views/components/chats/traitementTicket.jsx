import { Button, Card, Flex, Space } from "antd";
import { Bubble, Sender, } from '@ant-design/x';
import { useState } from "react";
import { LinkOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
const { Meta } = Card

const TchatSms = ({ data }) => {
    const [content, setContent] = useState('')
    const [message, setMessages] = useState([{
        status: 'interlocuteur',
        sms: "je suis un locuteur",
    }])
    const [loading, setLoading] = useState(false);

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

    const newSms = (sms, role) => {
        setMessages([...message, {
            status: role,
            sms: sms,
            
        }])
    }


    return (

        <Flex vertical gap="middle" style={{
            position: "relative",
            maxWidth: 1000,
            maxHeight: 1000,
            top: "5px"
        }}>
            <Bubble.List
                roles={roles}
                style={{
                    maxHeight: 600,
                    maxWidth: 1000,
                    paddingInline: 16
                }}
                items={message.map(({ id, sms, status }) => ({
                    key: id,
                    role: status === 'locuteur' ? 'locuteur' : 'interlocuteur',
                    content: sms
                }))}
                sha />

            <Sender
                style={{
                    padding: "10px",
                    position: "relative",
                    border: "1px solid transparent",
                    textAlign: "center",
                    paddingBlockStart: "2px",
                    bottom: "10px"
                }}
                autoSize:true
                placeholder="Discutions"
                value={content}
                onChange={setContent}
                onSubmit={messages => {
                    newSms(messages, "locuteur")

                }}
                prefix={
                    <Button
                        type="text"
                        icon={<LinkOutlined />}
                        onClick={() => {
                        }}
                    />
                }

                actions={
                    (_, info) => {
                        const { SendButton, ClearButton, SpeechButton } = info.components;

                        return (
                            <Space size="small">

                                <ClearButton />

                                <SendButton type="primary" icon={<SendOutlined />} />
                            </Space>
                        );
                    }
                }

            />

        </Flex>

    )
};

export default TchatSms