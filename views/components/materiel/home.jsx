import { RightOutlined } from "@ant-design/icons";
import { Card, Layout } from "antd";
import Materielshow from "./show";



const { Meta } = Card
const MaterielHome = () => {
     return (
        <>
            <Layout>
                <Card cover={<h1>&nbsp;&nbsp;<RightOutlined />Materiel</h1>} >
                    <Meta title={<Materielshow />} />
                </Card>
            </Layout>
        </>
    );
};

export default MaterielHome