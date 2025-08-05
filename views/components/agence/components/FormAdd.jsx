import { Button, DatePicker, Flex, Form, Input, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { SendOutlined, StopOutlined, SwapLeftOutlined } from "@ant-design/icons";
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


const FormAgence = () => {
    const navigate = useNavigate()

    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    const [form] = Form.useForm()

    const initData = {
        code: "",
        libelle: "",
        localite: "",
    }

    const [data, setData] = useState(initData)
    const [isAgenceExiste, setIsAgenceExiste] = useState(false)
    /** verifie si un utilisateur existe */
    const findOne = async (code) => {

        try {
            const fetch = await window.fetch(`${api}/agence/edit/${code}`, {
                headers: headersHttp,
                method: "GET",
            })
            const json = await fetch.json()
            return json;

        } catch (error) {
            const err = {
                message: error
            }
            return err;
        }

    }
    /** function d'ajout des donné */
    const insert = async (agence) => {
        try {
            if (agence) {
                const fetch = await window.fetch(`${api}/agence/add`, {
                    headers: headersHttp,
                    body: JSON.stringify(data),
                    method: "POST",
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
        const response = await findOne(data.code)
        if (response?.message != "error") {
            setIsAgenceExiste(true)
        } else {
            setIsAgenceExiste(false)
            const response = await insert(data)
            if (response?.message == "error") {
                response?.type == "ConstraintViolationError" || response?.type == "UniqueViolationError" ?
                    setIsAgenceExiste(true) : setIsAgenceExiste(false)
            }else{
                navigate('/agence')
            } 
        }
    }

    const hadleChange = event => {
        const { value, name } = event.target
        setData({ ...data, [name]: value })
     

    }


    return (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/agence", { replace: true })}
                    icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                    <span style={{ fontSize: "20px" }}>Précédent</span>
                </Button>
            </Flex>


            <div style={{
                filter: "blur(0.2px)",
                borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center",

            }}>


                <Form 
                    initialValues={{ remember: true }}
                    name="form-control"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="of"
                    {...formItemLayout} style={{
                        maxWidth: "100vh",
                        borderTopLeftRadius: "25px",
                        borderBottomLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        borderBottomRightRadius: "25px",
                        marginTop: "10px", backgroundColor: "ButtonFace"
                    }}>

                    <Form.Item name={"code"}
                        rules={[
                            { required: true, message: "Veuillez saisir le code Agence" }
                        ]}
                        help={isAgenceExiste ? "Cette enregistrement existe" : null}
                        validateStatus={isAgenceExiste ? "error" : "validating"}
                        label="Code">

                        <Input name="code" onChange={hadleChange} placeholder="Saisir le code de l'agence"  />
                    </Form.Item>

                    <Form.Item name={"libelle"}
                        rules={[
                            { required: true, message: "Veuillez saisir la libelle agence" }
                        ]}

                        label="Agence" validateStatus="validating">
                        <Input name="libelle" onChange={hadleChange} placeholder="Entrer le nom de l'agence"  />
                    </Form.Item>

                    <Form.Item name={"localite"}
                        rules={[
                            { required: true, message: "Veuillez saisir la localite agence" }
                        ]}
                        label="Localite"
                        validateStatus="validating">
                        <Input name="localite" onChange={hadleChange} placeholder="Entrer la localite de l'agence"  />
                    </Form.Item>




                    <Form.Item style={{ opacity: "0" }} label="Téléphone">
                        <Input.OTP type="number" length={7} />
                    </Form.Item>
                    {/** button de validation de formulaire */}
                    <Form.Item label={null} >
                        <Flex vertical gap="small">
                            <Flex gap="small" wrap>
                                <Space size="large">
                                    <Space.Compact>
                                        <Button htmlType="reset" variant="solid" color="danger"  >&nbsp; Annuler</Button>

                                        <Button htmlType="submit" variant="solid" color="blue" icon={<SendOutlined style={{ color: "#fff" }} size="large" />} >&nbsp; Envoyer</Button>
                                    </Space.Compact>
                                </Space>

                            </Flex>
                        </Flex>
                    </Form.Item>

                </Form>
            </div>

        </Flex>
    );

};


export default FormAgence