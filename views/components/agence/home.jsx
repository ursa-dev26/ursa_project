import { RightOutlined } from "@ant-design/icons"
import { Layout, Card } from "antd"
import AgenceShow from "./show";

const { Meta } = Card

const AgenceHome = () => {
    return (
        <>
            <Layout>
                <Card cover={<h1>&nbsp;&nbsp;<RightOutlined />AGENCE URSA</h1>} >
                    <Meta title={<AgenceShow />} />
                </Card>
            </Layout>
        </>
    );
}

export default AgenceHome;