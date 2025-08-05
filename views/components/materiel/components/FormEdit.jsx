import { SendOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { Button, DatePicker, Flex, Form, Input, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from "react";
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

dayjs.extend(customParseFormat);

const FormEdit = ({ data, setData, materiel }) => {
    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }
    const ListOptions = ["Neuf","Hors service","autre"]

    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [isMacExiste, setIsMacExiste] = useState(false)

    /** on Finish */
    const onFinish = async () => {
        try {
            const request = await window.fetch(`${api}/materiel/update/${materiel}`, {
                headers: headersHttp,
                body:JSON.stringify(data),
                method: "PATCH",
                mode: "cors"
            })
            const json = await request.json()

            if (json?.message == "error") {
                json?.type == "ConstraintViolationError" || json?.type == "UniqueViolationError" ?
                    setIsMacExiste(true) : setIsMacExiste(false)
            } else {
                navigate("/materiel")
            }
            return json
        } catch (error) {
            console.log(error);
            return null
        }
    }
    const hadleChange = event => {
        const { value, name } = event.target
        setData({ ...data, [name]: value })
    }
    const hadleChagedate = (_, dateStr) => {
        setData({ ...data, "date_mise_service": dateStr })
    }

    const hadleChageSelect = (value) => {
        setData({ ...data, "etat": value })

    }

    return (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/materiel", { replace: true })}
                    icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                    <span style={{ fontSize: "20px" }}>Précédent</span>
                </Button>
            </Flex>


            <div style={{
                filter: "blur(0.2px)",
                borderRadius: "5px", justifyContent: "center", alignItems: "center",

            }}>


                <Form
                    initialValues={{ remember: true }}
                    name="form-control"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="of"
                    {...formItemLayout} style={{
                        maxWidth: 800,
                        borderTopLeftRadius: "25px",
                        borderBottomLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        borderBottomRightRadius: "25px",
                        marginTop: "10px", backgroundColor: "ButtonFace"
                    }}>

                    <Form.Item
                        help={isMacExiste ? "Cette enregistrement existe" : null}
                        validateStatus={isMacExiste ? "error" : "validating"}
                        label="Adresse Mac">
                        <Input name="adresse_mac" value={data?.adresse_mac} onChange={hadleChange} placeholder="Saisir l'adresse mac du materiel" />
                    </Form.Item>

                    <Form.Item
                        label="Numéro de série" validateStatus="validating">
                        <Input name="serial_number" value={data?.serial_number} onChange={hadleChange} placeholder="Entrer le numero de serie" />
                    </Form.Item>

                    <Form.Item
                        label="Libelle"
                        validateStatus="validating">
                        <Input name="libelle" onChange={hadleChange} value={data?.libelle} placeholder="libelle" />
                    </Form.Item>

                    <Form.Item
                        label="Mise en service" hasFeedback >
                        <DatePicker name="date_mise_service"
                            value={dayjs(data?.date_mise_service)}
                            onChange={hadleChagedate} initialValues={dayjs('2025-06-12', "YYYY-MM-DD")} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Etat">
                        <Select onChange={hadleChageSelect} value={data?.etat}
                            options={ListOptions.map((val, ind) => {
                                return {
                                    key: ind,
                                    label: val,
                                    value: val
                                }
                            })} placeholder="Etat" allowClear />

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
    )

};

export default FormEdit