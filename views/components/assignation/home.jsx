import { Layout, Card } from "antd"
import { RightOutlined } from "@ant-design/icons"
import AssignationShow from "./show";


const { Meta } = Card

const AssignationHome = () => {
    return (
        <>
            <Layout>
                <Card style={{height:600} } cover={<h1>&nbsp;&nbsp;<RightOutlined />Assignation</h1>} >
                    <Meta title={<AssignationShow />} style={{height:600} } />
                </Card>
            </Layout>
        </>
    );
}

export default AssignationHome;