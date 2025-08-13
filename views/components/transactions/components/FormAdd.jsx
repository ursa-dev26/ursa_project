import { SendOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { Button, Form, Flex, Input, Space, Select, InputNumber } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import isValuePresent from "../../validate";

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

/**
 * composant
 */

const FormAdd = ({ agence, materiel }) => {


    const navigate = useNavigate()
    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }
    const initData = {
        qté: 0,
        objet: "",
        agence_ref: "",
        materiel_ref: ""
    }
    const [form] = Form.useForm()
    const [data, setData] = useState(initData)


    /** sauvegarde des données a la base de donné */
    const onSave = async () => {
        try {
            const request = await window.fetch(`${api}/transaction/add`, {
                headers: headersHttp,
                body: JSON.stringify(data),
                method: "POST",
                mode: "cors"
            })
            const json = await request.json()
            return json;
        } catch (error) {
                        new Error(""+error)

            return null

        }
    }

    /** on Finish */
    const onFinish = async () => {
        if (isValuePresent(data)) {
            const response = await onSave(data)
            if (response?.message == "error") {
                response?.type == "ConstraintViolationError" || response?.type == "UniqueViolationError" ?
                    alert("une erreur est survenue") : null

            } else {
                navigate('/transaction')
            }
        }


    }

    const hadleChange = event => {
        const { value, name } = event.target
        setData({ ...data, [name]: value })
    }

    const hadleChangeNumber = value => {
        setData({ ...data, "qté": value })
    }


    const hadleChageSelect1 = (value) => {
        setData({ ...data, "agence_ref": value })
    }
    const hadleChageSelect2 = (value) => {
        setData({ ...data, "materiel_ref": value })
    }

    return (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">
                <Button type="link" onClick={() => navigate("/transaction", { replace: true })}
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

                    <Form.Item name={"qté"}
                        rules={[
                            { required: true, message: "Veuillez saisir la quantité" }
                        ]}
                        validateStatus={"validating"}
                        label="Quantité">

                        <InputNumber min={1} name="qté" onChange={hadleChangeNumber} placeholder=" Quantité" />
                    </Form.Item>

                    <Form.Item name={"Objet"}
                        rules={[
                            { required: true, message: "Veuillez entrer l'objet de la transaction" }
                        ]}

                        label="Objet" validateStatus="validating">
                        <Input name="objet" onChange={hadleChange} placeholder="Objet de la transaction" />
                    </Form.Item>

                    <Form.Item name={"agence_ref"} rules={[
                        { required: true, message: "Veuillez selectioné l'agence" }
                    ]}
                        label="Agence">
                        <Select onChange={hadleChageSelect1} options={agence?.map((val) => {
                            return {
                                key: val?.id,
                                label: val?.code + " / " + val?.libelle + " " + val?.localite,
                                value: val?.code
                            }
                        })} placeholder="Agence" allowClear />

                    </Form.Item>

                    <Form.Item name={"materiel_ref"} rules={[
                        { required: true, message: "Veuillez selectioné le materiel" }
                    ]}
                        label="Materiel">
                        <Select onChange={hadleChageSelect2} options={materiel?.map((val) => {

                            return {
                                key: val?.id,
                                label: val.adresse_mac + " /" + val?.libelle,
                                value: val?.id
                            }
                        })} placeholder="Agence" allowClear />

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