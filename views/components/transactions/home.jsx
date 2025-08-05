import { Layout, Card } from "antd"
import { RightOutlined } from "@ant-design/icons"
import TransactionShow from "./show";


const { Meta } = Card

const TransactionHome = () => {
    return (
        <>
            <Layout>
                <Card cover={<h1>&nbsp;&nbsp;<RightOutlined />Transaction</h1>} >
                    <Meta title={<TransactionShow />} />
                </Card>
            </Layout>
        </>
    );
}

export default TransactionHome;