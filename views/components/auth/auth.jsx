import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Card, Form, Input, theme, Watermark } from "antd"
import Loading from "./loading";
import { useState } from "react";
import { useAuth } from './AuthContext.jsx';


const Authentification = () => {
    const { login, setIsLoggedIn, isLoggedIn, } = useAuth();

    const [logged, setlogged] = useState(true);


    // lors de la soumission du formulaire
    const onFinish = values => {
        login(values)

        if (isLoggedIn) {
            setlogged(true)
            setIsLoggedIn(true)
        } else {
            setlogged(false)

        }

    }




    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
    <Watermark content={"URSA"}>

   
    <div style={{
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('../src/assets/logo bank2.png')",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",

    }}>

        <Card style={{
            height: "50vh",
            backdropFilter: "blur(20px)",
            width: "80vh",
            boxShadow: "rgba(211, 243, 96, 0.50) 0px 54px 55px, rgba(0, 0, 0, 0.17)0px -12px 30px, rgba(211, 243, 96, 0.50) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(211, 243, 96, 0.50) 0px -3px 5px",
            background: "transparent",
            border: ` 0px solid transparent `
        }} title={<div> <Avatar size={25} icon={<UserOutlined />} />&nbsp;&nbsp; Authentification des utilisateurs</div>}
            cover={
                <div style={{
                    paddingTop: "15px",
                    paddingBlockEnd: "10px",
                    paddingBlockStart: "10px",
                    paddingRight: "10px",
                    justifyContent: 'center',
                    border: ` 0px solid transparent `
                }}>
                    <Form
                        name="Authentification"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{  border: ` 0px solid transparent ` }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            validateStatus={!logged ? "error" : "validating"}
                            label="Utilisateur"
                            name="email"
                            rules={[{ required: true, message: 'veuillez entrer votre email' }]}
                        >
                            <Input name="email" autoComplete="email" />
                        </Form.Item>

                        <Form.Item style={{ color: "white" }}
                            validateStatus={!logged ? "error" : "validating"}
                            label="Mot de passe"
                            name="password"
                            rules={[{ required: true, message: 'Veuillez saisir votre mot de passe' }]}
                        >
                            <Input.Password name="password" autoComplete="password" />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button style={{ justifyContent:"center" }} type="primary" size="small"  htmlType="submit">
                                Se connecter
                                {!logged ? <Loading /> : ""}
                            </Button>
                        </Form.Item>
                        {
                            !logged ?
                                <Form.Item label={null}>
                                    <span style={{ color: "red" }}> Erreur d'authentification. <br />Merci de réessayer</span>
                                </Form.Item> : <></>
                        }


                    </Form>

                </div>
            } />

    </div>
     </Watermark>)
}
export default Authentification