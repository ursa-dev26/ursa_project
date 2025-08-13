import { SendOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { Button, Form, Flex, Input, Space, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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


const FormAdd = () => {
    const navigate = useNavigate()
    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }
    const initData = {
        adresse_mac: "",
        serial_number: "",
        libelle: "",
        date_mise_service: "",
        etat: "",
    }
    const [form] = Form.useForm()
    const [data, setData] = useState(initData)
    const [isMacExiste, setIsMacExiste] = useState(false)


    const ListOptions = ["Neuf", "Hors service", "autre"]
    /** on verifie l'existance du materiel */
    const findOne = async (mac) => {
        try {
            const request = await window.fetch(`${api}/materiel/find/${mac}`, {
                headers: headersHttp,
                method: "GET",
                mode: "cors"
            })
            const json = await request.json()

            return json;
        } catch (error) {
            new Error("" + error)
            return null

        }
    }
    /** sauvegarde des données a la base de donné */
    const onSave = async () => {
        try {
            const request = await window.fetch(`${api}/materiel/add`, {
                headers: headersHttp,
                body: JSON.stringify(data),
                method: "POST",
                mode: "cors"
            })
            const json = await request.json()

            return json;
        } catch (error) {
            new Error("" + error)
            return null

        }
    }

    /** on Finish */
    const onFinish = async () => {
        const response = await findOne(data.adresse_mac)


        if (response?.message != "error") {
            setIsMacExiste(true)
        } else {
            setIsMacExiste(false)
            const response = await onSave(data)
            if (response?.message == "error") {
                response?.type == "ConstraintViolationError" || response?.type == "UniqueViolationError" ?
                    setIsMacExiste(true) : setIsMacExiste(false)
            } else {
                navigate('/materiel')
            }
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

                    <Form.Item name={"adresse_mac"}
                        rules={[
                            { required: true, message: "Veuillez saisir l'adresse mac" }
                        ]}
                        help={isMacExiste ? "Cette enregistrement existe" : null}
                        validateStatus={isMacExiste ? "error" : "validating"}
                        label="Adresse Mac">

                        <Input name="adresse_mac" onChange={hadleChange} placeholder="Saisir l'adresse mac du materiel" />
                    </Form.Item>

                    <Form.Item name={"serial_number"}
                        rules={[
                            { required: true, message: "Numero de serie" }
                        ]}

                        label="Numéro de série" validateStatus="validating">
                        <Input name="serial_number" onChange={hadleChange} placeholder="Entrer le numero de serie" />
                    </Form.Item>

                    <Form.Item name={"libelle"}
                        rules={[
                            { required: true, message: "Veuillez saisir le libele du materiel" }
                        ]}
                        label="Libelle"
                        validateStatus="validating">
                        <Input name="libelle" onChange={hadleChange} placeholder="libelle" />
                    </Form.Item>

                    <Form.Item name={"date_mise_service"} rules={[
                        { required: true, message: "Veuillez saisir la date de mise en service" }
                    ]}
                        label="Mise en service" hasFeedback >
                        <DatePicker name="date_mise_service" onChange={hadleChagedate} initialValues={dayjs('2025-06-12', "YYYY-MM-DD")} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name={"role"} rules={[
                        { required: true, message: "Veuillez selectioné un etat" }
                    ]}
                        label="Etat">
                        <Select onChange={hadleChageSelect} options={ListOptions.map((val, ind) => {
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

export default FormAdd