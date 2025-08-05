import { RightOutlined } from "@ant-design/icons";
import { Card, Layout, Watermark } from "antd";
import FormAdd from "./components/FormAdd";
const {Meta}=Card 

const MaterielAdd = () => {

    return (

        <>
            <Layout>
                <Card cover={
                    <Watermark height={35} width={100} content={"URSA"}>
                        <h1>
                            &nbsp;&nbsp;<RightOutlined />Ajouter un materiel</h1>
                    </Watermark>}>
                    <Meta title={<FormAdd />} />
                </Card>
            </Layout>

        </>

    );
     
};
export default MaterielAdd