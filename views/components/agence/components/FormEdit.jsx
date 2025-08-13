import { Button, DatePicker, Flex, Form, Input, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined,SwapLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};


const FormUser = ({ agence, setAgence }) => {
    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [isAgenceExiste, setIsAgenceExiste] = useState(false)



    /** function d'ajout des donné */
    const update = async (dataUpdate) => {

        try {
            if (dataUpdate) {
                setData({
                    libelle: dataUpdate?.libelle,
                    localite: dataUpdate?.localite
                })
                const fetch = await window.fetch(`${api}/agence/update/${dataUpdate.code}`, {
                    headers: headersHttp,
                    body: JSON.stringify(data),
                    method: "PATCH",
                    mode: "cors"
                })
                const json = await fetch.json()

                return json;
            }
            return null

        } catch (error) {
            const err = {
                message: error
            }
            return err;
        }

    }

    const onFinish = async () => {

        const reqUpdate = await update(agence)


        if (reqUpdate?.message == "error") {
            reqUpdate?.type == "ConstraintViolationError" || reqUpdate?.type == "UniqueViolationError" ?
                setIsAgenceExiste(true) : setIsAgenceExiste(false)
        } else {
            navigate("/agence")
        }

    }

       const hadleChange = event => {
        const { value, name } = event.target
        setAgence({ ...agence, [name]: value })
       

    }

    return agence ? (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/agence", { replace: true })}
                    icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                    <span style={{ fontSize: "20px" }}>Précédent</span>
                </Button>
            </Flex>

            {/**formulaire de saisie d'utilisateur
             * validateStatus="success"
             * hasFeedback
             * help="Veuillez entrer le matricule de l'utilisateur"
             *  */ }
            <div style={{
                filter: "blur(0.2px)",
                borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center",

            }}>


                <Form key={"formEditagence"}
                    form={form}
                    onFinish={onFinish}
                    {...formItemLayout} style={{
                        maxWidth: "100vh",
                        borderTopLeftRadius: "25px",
                        borderBottomLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        borderBottomRightRadius: "25px",
                        marginTop: "10px", backgroundColor: "ButtonFace"
                    }}>

                    <Form.Item label="Code" 
                        
                        help={isAgenceExiste ? "Cette enregistrement existe" : null}
                        validateStatus={isAgenceExiste ? "error" : "validating"}>

                        <Input key={"codeEdit"} name="code" disabled value={agence.code}
                         placeholder="Saisir le code de l'agence" id="Code"  />
                    </Form.Item>

                    <Form.Item 
                       
                        label="Agence" validateStatus="validating">
                        <Input name="libelle" defaultValue={agence.libelle} key={"agenceEdit"}
                        onChange={hadleChange}
                         placeholder="Entrer le nom de l'agence"  />
                    </Form.Item>

                    <Form.Item 
                       
                        label="Localite"
                        validateStatus="validating">
                        <Input name="localite" defaultValue={agence.localite} key={"localedit"}
                        onChange={hadleChange}
                         placeholder="Entrer la localite de l'agence"  />
                    </Form.Item>




                    <Form.Item style={{ opacity: "0" }} key={"hidenedit"} label="Téléphone">
                        <Input.OTP type="number" length={7} />
                    </Form.Item>
                    {/** button de validation de formulaire */}
                    <Form.Item label={null} >
                        <Flex vertical gap="small">
                            <Flex gap="small" wrap>
                                <Space size="large">
                                    <Space.Compact>
                                        <Button htmlType="reset" variant="solid" color="danger" >&nbsp; Annuler</Button>

                                        <Button htmlType="submit" variant="solid" color="blue" icon={<EditOutlined style={{ color: "#fff" }} size="large" />} >&nbsp; Modifier</Button>
                                    </Space.Compact>
                                </Space>

                            </Flex>
                        </Flex>
                    </Form.Item>

                </Form>
            </div>

        </Flex>
    ) : navigate("/agence")

};


export default FormUser