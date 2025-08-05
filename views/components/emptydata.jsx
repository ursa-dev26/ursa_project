import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const EmptydataLoad = ({title} ) => {
    return (<div style={{
        height: "50vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
    }} >
       {title=="default" ? "Aucun élément trouvé": title==null?null:title }   &nbsp;
        <Spin indicator={<LoadingOutlined style={{ fontSize: 68 }} spin />} />
    </div>);
}

export default EmptydataLoad;