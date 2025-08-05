import { Card, Layout, Watermark } from "antd";
import { RightOutlined } from "@ant-design/icons";
import FormTicket from "./components/FormAdd";
const { Meta } = Card


const TicketAdd = () => {

    return (

        <>
            <Layout>
                <Card cover={
                    <Watermark height={35} width={100} content={"URSA"}>
                        <h1>
                            &nbsp;&nbsp;<RightOutlined />Creation de ticket</h1>
                    </Watermark>}>
                    <Meta title={<FormTicket />} />
                </Card>
            </Layout>

        </>

    );
}

export default TicketAdd;