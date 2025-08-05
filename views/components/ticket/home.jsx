import { Layout, Card } from "antd"
import { RightOutlined } from "@ant-design/icons"

import TicketShow from "./show";

const { Meta } = Card

const AssignationHome = () => {
    return (
        <>
            <Layout>
                <Card cover={<h1>&nbsp;&nbsp;<RightOutlined />Tickets</h1>} >
                    <Meta title={<TicketShow />} />
                </Card>
            </Layout>
        </>
    );
}

export default AssignationHome;