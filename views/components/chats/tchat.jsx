import { RightOutlined } from "@ant-design/icons";
import { Card, Layout, Watermark } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Discution from "../assignation/components/Discution";
const { Meta } = Card


const AssignationTchat = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const codeTicket = searchParams.get('code')

    useEffect(() => {
        console.log("codeTicket",codeTicket);
        
    }, []);

    return (
        < Layout >
            <Card cover={
                <Watermark height={35} width={100} content={"URSA"}>
                    <h1>
                        &nbsp;&nbsp;<RightOutlined /> {codeTicket}  </h1>
                </Watermark>}>
                <Meta title={<Discution/>} />
            </Card>
        </Layout >

    )
}


export default AssignationTchat;