import { RightOutlined } from "@ant-design/icons"
import { Layout, Card } from "antd"
import AffectationShow from "./show";

const { Meta } = Card

const AffectationHome = () => {
    return (
        <>
            <Layout>
                <Card cover={<h1>&nbsp;&nbsp;<RightOutlined />Affectation URSA</h1>} >
                    <Meta title={<AffectationShow />} />
                </Card>
            </Layout>
        </>
    );
}

export default AffectationHome;