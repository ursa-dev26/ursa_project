

import { theme, Layout, Tabs } from "antd";
import StickyBox from 'react-sticky-box';
import ListNonassigne from "./components/ticketNonassigne";
import ListAssigne from "./components/ticketAssigné";
import { useState } from "react";
import ListEncourTraitement from "./components/ticketEncourTraitement";





const AssignationShow = () => {


    //theme de l'apploication
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // rendu de chaque page
    const renderTabBar = (props, DefaultTabBar) => (
        <StickyBox offsetTop={0} offsetBottom={60} style={{ zIndex: 1 }}>
            <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
        </StickyBox>)
    // customisation de tous items de la page
    const items = [
        {
            label: "Acceuil",
            key: 1,
            children: <ListNonassigne />,
            style: { height: 400 }
        },
        {
            label: "En attente de traitement",
            key: 2,
            children: <ListAssigne />,
            style: { height: 400 }
        },

        {
            label: "En cours de traitement",
            key: 3,
            children: <ListEncourTraitement />,
            style: { height: 400 }
        },
        {
            label: "Cloture",
            key: 4,
            children: <ListAssigne />,
            style: { height: 400 }
        }
    ];






    return (

        <Layout style={{
            padding: "0px",
            position: "relative", top: "0",
            marginTop: "0px", marginRight: "5px"
        }}>

            <Tabs defaultActiveKey="1" style={{ height: 1000, background: colorBgContainer }} renderTabBar={renderTabBar} items={items} />


        </Layout >
    )

};


export default AssignationShow

