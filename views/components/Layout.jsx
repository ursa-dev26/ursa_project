import { Layout, Menu, theme, Button, Watermark, Image, Flex, Avatar } from "antd"
import {
    UserSwitchOutlined,
    MenuFoldOutlined, MenuOutlined,
    SwapOutlined,
    SolutionOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined
} from "@ant-design/icons"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../components/auth/AuthContext.jsx';
import isValuePresent from "./validate.js";

const { Header, Content, Footer, Sider } = Layout

// un tableau d'icone
const icones = [UserSwitchOutlined, SwapOutlined, SolutionOutlined]
const childrenUser = ["Utilisateur", "Agence", "Affectations", "Materiel"]
const childrenTicket = ["Ticket", "Assignation", "autres"]
// parcourir le tableau d'icone pour creer les items
const items = icones.map((val, index) => {
    return {
        key: `sub${index} `,
        label: val == SolutionOutlined ? "Gestion des tickets" :
            val == SwapOutlined ? <Link to="/transaction">{"Transaction"} </Link>
                : "Gestion d'utilisateur",
        icon: val == UserSwitchOutlined ? React.createElement(UserSwitchOutlined) :
            val == SwapOutlined ?
                React.createElement(SwapOutlined) : React.createElement(SolutionOutlined),
        children: val == SolutionOutlined ?
            childrenTicket.map((valeur, ind) => {
                return {
                    key: `tic${ind} `,
                    label: valeur == "Ticket" ?
                        <Link to="/ticket"> {`${valeur}`} </Link> :
                        valeur == "Assignation" ?
                            <Link to="/assignation"> {valeur}</Link> :
                            <Link to="/autre">{valeur} </Link>
                }
            }) :
            val == SwapOutlined ? null :
                childrenUser.map((valeur, ind) => {
                    return {
                        key: `user${ind} `,
                        label: valeur == "Utilisateur" ?
                            <Link to="/user"> {valeur} </Link> :
                            valeur == "Agence" ?
                                <Link to="/agence"> {valeur}</Link> :
                                valeur == "Materiel" ?
                                    <Link to="/materiel"> {valeur}</Link> :
                                    <Link to="/affectation">{valeur} </Link>
                    }
                })

    }
})







/** composant layout  */

const URSALayout = ({ children }) => {

    // definition des etats locale
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const { isLoggedIn, user } = useAuth();

    const ucfirst = (string) => {
        return string?.charAt(0)?.toUpperCase() + string?.slice(1);
    }

    const upercase = (string) => {
        return string?.toUpperCase();
    }


    useEffect(() => {
       

    }, [isLoggedIn]);

    return !isLoggedIn ? (<Layout>
        <Content children={children} style={{
            margin: 0,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
        }} />
    </Layout>) :
        <Layout>

            <Header >


                <Menu mode="horizontal" activeKey="decoxion" direction="rtl" items={[

                    {
                        key: "ic",
                        label: <Button type="text" icon={collapsed ? <MenuOutlined style={{ fontSize: "30px" }} /> :
                            <MenuFoldOutlined style={{ fontSize: "30px" }} />}
                            onClick={() => setCollapsed(!collapsed)} style={{
                                fontSize: '30px',
                                color: "white"
                            }} />
                    },
                    {
                        key: "logo",
                        label: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Avatar size={55} icon={<Image src="../src/assets/logo1.png" />} /></>
                    },

                    {
                        key: "acceuil",
                        icon: React.createElement(HomeOutlined),
                        label: <Button type="link" style={{
                            fontSize: '16px',
                            color: "white"
                        }}><Link to="/"> {"Acceuil"}</Link></Button>
                    },

                    {
                        key: "transaction",
                        icon: React.createElement(SwapOutlined),
                        label: <Button type="link" style={{
                            fontSize: '16px',
                            color: "white"
                        }}><Link to="/transaction"> {"Transaction"}</Link></Button>
                    },

                    {
                        key: "ticket",
                        icon: React.createElement(SwapOutlined),
                        label: <Button type="link" style={{
                            fontSize: '16px',
                            color: "white"
                        }}><Link to="/ticket"> {"Ticket"}</Link></Button>
                    },

                    {
                        key: "decoxion",
                        icon: React.createElement(LogoutOutlined),
                        label: <Button type="link" style={{
                            fontSize: '16px',
                            color: "white"
                        }}><Link to="/logout"> {"Deconnexion"}</Link></Button>
                    }
                ]} theme="dark" style={{ position: "relative" }} />

            </Header>
            <Layout>
                {isValuePresent(user) ? user?.fonction == "Administation de base de donnée" ?
                    <Sider width={200} style={{ background: colorBgContainer }} trigger={null} collapsible collapsed={collapsed}  >
                        <Menu mode="inline" theme="dark"
                            items={items}
                            style={{ height: '128%', borderRight: 0 }}>
                        </Menu>
                    </Sider> : <></>
                    : <></>
                }


                <Layout style={{ padding: '0 24px 24px' }}>



                    <Content children={children} style={{
                        padding: 10,
                        margin: 0,
                        minHeight: 700,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }} />


                    <Footer style={{ position: "relative", maxHeight: 50, background: "colorBgContainer", textAlign: "center" }}>
                        <Watermark content={"URSA"}>

                            <div style={{ display: "flex", top: "0px" }}>
                                <div><Avatar size={60} style={{ background: "gray" }}
                                    icon={isLoggedIn ? <UserOutlined style={{ fontSize: "30px" }} /> :
                                        <Image preview={false} src="../src/assets/logo1.png" />
                                    } />&nbsp;&nbsp;
                                    <span style={{ fontSize: "16px" }}>
                                        {upercase(user?.nom) + "  " + ucfirst(user?.prenom)}
                                    </span>
                                </div>
                            </div>
                        </Watermark>
                    </Footer>

                </Layout>

            </Layout>
        </Layout>
}

export default URSALayout;
