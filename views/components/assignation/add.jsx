import { Card, Layout, Watermark } from "antd";
import { RightOutlined } from "@ant-design/icons";
import FormAdd from "./components/FormAdd";
const { Meta } = Card


const AssignationAdd = () => {

    return (

        <>
            <Layout>
                <Card cover={
                    <Watermark height={35} width={100} content={"URSA"}>
                        <h1>
                            &nbsp;&nbsp;<RightOutlined />Assigné un tickets</h1>
                    </Watermark>}>
                    <Meta title={<FormAdd />} />
                </Card>
            </Layout>
        </>
    );
}

export default AssignationAdd;