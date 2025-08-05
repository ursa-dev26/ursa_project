import { useNavigate } from "react-router-dom";
import isValuePresent from "../../validate";
import { SendOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputNumber, Select, Space } from "antd";
import { useState } from "react";
import EmptydataLoad from "../../emptydata";

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

const FormEdit = ({ transaction, setTransaction, agence, materiel, id }) => {

    const navigate = useNavigate()
    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    const [form] = Form.useForm()


    /** sauvegarde des données a la base de donné */
    const onSave = async () => {
        try {
            const request = await window.fetch(`${api}/transaction/update/${id} `, {
                headers: headersHttp,
                body: JSON.stringify(transaction),
                method: "PATCH",
                mode: "cors"
            })
            const json = await request.json()
            return json;
        } catch (error) {
            console.log(error);
            return null

        }
    }

    /** on Finish */
    const onFinish = async () => {

        if (isValuePresent(agence)) {
            const response = await onSave(transaction)
            if (response?.message == "error") {
                response?.type == "ConstraintViolationError" || response?.type == "UniqueViolationError" ?
                    alert("Une erreur est survenue") : null

            } else {
                navigate('/transaction')
            }
        }


    }

    const hadleChange = event => {
        const { value, name } = event.target
        setTransaction({ ...transaction, [name]: value })
    }

    const hadleChangeNumber = value => {
        setTransaction({ ...transaction, "qté": value })
    }


    const hadleChageSelect1 = (value) => {
        setTransaction({ ...transaction, "agence_ref": value })
    }
    const hadleChageSelect2 = (value) => {
        setTransaction({ ...transaction, "materiel_ref": value })
    }


    return isValuePresent(transaction) ? (
        <>
            <Flex gap="middle" vertical >
                <Flex align="center" gap="middle">
                    <Button type="link" onClick={() => navigate("/transaction", { replace: true })}
                        icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                        <span style={{ fontSize: "20px" }}>Précédent</span>
                    </Button>
                </Flex>
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
                        validateStatus={"validating"}
                        label="Quantité">

                        <InputNumber min={1} name="qté" value={transaction?.qté} onChange={hadleChangeNumber} placeholder=" Quantité" />
                    </Form.Item>

                    <Form.Item
                        label="Objet" validateStatus="validating">
                        <Input name="objet" onChange={hadleChange} value={transaction?.objet} placeholder="Objet de la transaction" />
                    </Form.Item>

                    <Form.Item
                        label="Agence">
                        <Select onChange={hadleChageSelect1} value={transaction?.agence_ref} options={agence.map((val) => {
                            return {
                                key: val?.id,
                                label: val?.code + " / " + val?.libelle + " " + val?.localite,
                                value: val?.code
                            }
                        })} placeholder="Agence" allowClear />

                    </Form.Item>

                    <Form.Item
                        label="Materiel">
                        <Select onChange={hadleChageSelect2} value={transaction?.materiel_ref} options={materiel.map((val) => {

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
        </>

    ) : <EmptydataLoad title={null}  />

};

export default FormEdit