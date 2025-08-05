import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = ({title} ) => {
    return (<div style={{
        display: "flex",
        background:"gray",
        borderRadius:"20px tranparent",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
    }} >
       {title=="default" ? "Aucun élément trouvé": title==null?null:title }   &nbsp;
        <Spin indicator={<LoadingOutlined style={{ fontSize: 20,color:"white"}} spin />} />
    </div>);
}

export default Loading;