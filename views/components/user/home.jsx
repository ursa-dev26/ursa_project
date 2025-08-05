import { RightOutlined } from "@ant-design/icons"
import { Layout, Card } from "antd"
import UserShow from "./show";

const { Meta } = Card

const Userhome = () => {

    
    return (
        <>
            <Layout>
                <Card cover={<h1>&nbsp;&nbsp;<RightOutlined />Utilisateur URSA </h1>} >
                    <Meta title={<UserShow/>} />
                </Card>
            </Layout>
        </>
    );
}

export default Userhome;