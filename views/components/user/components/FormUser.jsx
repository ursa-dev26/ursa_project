import { Avatar, Button, DatePicker, Flex, Form, Input, Popover, Select, Space, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, SendOutlined, StopOutlined, SwapLeftOutlined } from "@ant-design/icons";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";
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


dayjs.extend(customParseFormat);


{/** composant de formulaire*/ }

const FormUser = ({ tabTemp, setTabTemp, setShow }) => {

    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    const navigate = useNavigate()
    const initData = {
        matricule: "",
        nom: "",
        prenom: "",
        date_naissance: "",
        role: 0,
        telephone: ""
    }
    const [data, setData] = useState(initData)
    const [values, setValues] = useState(false)
    const [isMatriculeExiste, setIsExisteMatricule] = useState(false)

    /** element manipulant le formulaire */
    const [form] = Form.useForm()


    /** verifie si un utilisateur existe */
    const findOne = async (user) => {

        try {
            const fetch = await window.fetch(`${api}/user/edit/${user}`, {
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
    const insert = async (user) => {
        try {
            if (user) {
                
                const fetch = await window.fetch(`${api}/user/add`, {
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

    /**
     * on gere l'action de l'utilisateur
     */
    const onFinish = async () => {


        // on envoie a la base

        if (values) {
            const response = await findOne(data.matricule)
            if (response?.message != "error") {
                setIsExisteMatricule(true)
            } else {

                if (tabTemp.length != 0) {
                    const test = tabTemp.some(previous => {
                        if (previous.matricule === data.matricule) {
                            return true
                        } else {
                            return false
                        }

                    })

                    if (test) {
                        setIsExisteMatricule(true)

                    } else {
                        setTabTemp((previous) => [data, ...previous])
                        setIsExisteMatricule(false)
                        form.resetFields()
                    }


                } else {
                    setTabTemp((previous) => [data, ...previous])
                    setIsExisteMatricule(false)
                    form.resetFields()
                }

            }

        } else {
            const response = await insert(data)
            if (response?.message == "error") {
                response?.type == "ConstraintViolationError" || response?.type == "UniqueViolationError" ?
                    setIsExisteMatricule(true) : setIsExisteMatricule(false)
            } else {
                navigate("/user")
            }

        };
    }

    const hadleChange = event => {
        const { value, name } = event.target
        setData({ ...data, [name]: value })
    }
    const hadleChagedate = (_, dateStr) => {
        setData({ ...data, "date_naissance": dateStr })
    }

    const hadleChageSelect = (value) => {
        setData({ ...data, "role": value })

    }
    const hadleChangePhone = (value) => {
        setData({ ...data, "telephone": value })

    }
    /** affiche et cache la liste des données temporaire */
    const handleShow = (value) => {
        setShow(value)
        setValues(value)
    }




    return (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/user", { replace: true })}
                    icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                    <span style={{ fontSize: "20px" }}>Précédent</span>
                </Button>
            </Flex>

            {/**formulaire de saisie d'utilisateur*/}
            <div style={{
                filter: "blur(0.2px)",
                borderRadius: "5px",

            }}>




                <Form {...formItemLayout}
                    name="form-control"
                    initialValues={{ remember: true }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="of"
                    style={{
                        marginLeft: "20px",
                        boxShadow: "0 0 15px purple",
                        maxWidth: "80vh",
                        borderTopLeftRadius: "25px",
                        borderBottomLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        borderBottomRightRadius: "25px",
                        marginTop: "10px",
                         backgroundColor: "ButtonFace"
                    }}>


                    <Form.Item name={"matricule"}  style={{marginTop:"15px"}}
                    rules={[
                        { required: true, message: "Veuillez saisir le matricule" }
                    ]}
                        help={isMatriculeExiste ? "Cette enregistrement existe" : null}
                        label="Matricule"
                        validateStatus={isMatriculeExiste ? "error" : "validating"} >

                        <Input name="matricule" style={{ borderTop: "5px" }} onChange={hadleChange} placeholder="Saisir le matricule de l'utilisateur" id="validating" />
                    </Form.Item>

                    <Form.Item name={"nom"} rules={[
                        { required: true, message: "Veuillez entrer le nom" }
                    ]}
                        label="Nom" validateStatus="validating">
                        <Input name="nom" onChange={hadleChange} placeholder="Entrer le nom de l'utilisateur" id="validating" />
                    </Form.Item>

                    <Form.Item name={"prenom"} rules={[
                        { required: true, message: "Veuillez saisir le prénom" }
                    ]}
                        label="Prénom"
                        validateStatus="validating">
                        <Input name="prenom" onChange={hadleChange} placeholder="Entrer le prenom de l'utilisateur" id="validating" />
                    </Form.Item>

                     <Form.Item name={"email"} rules={[
                        { required: true, message: "Veuillez saisir l'email" }
                    ]}
                        label="Email"
                        validateStatus="validating">
                        <Input name="email" onChange={hadleChange} placeholder="Entrer votre email" id="validating" />

                    </Form.Item> <Form.Item name={"password"} rules={[
                        { required: true, message: "Veuillez saisir le mot de passe" }
                    ]}
                        label="Mot de passe"
                        validateStatus="validating">
                        <Input.Password name="password" onChange={hadleChange} placeholder="Entrer le mot de passe" id="validating" />
                    </Form.Item>

                    <Form.Item name={"date_naissance"} rules={[
                        { required: true, message: "Veuillez saisir la date de naissace" }
                    ]}
                        label="Date de naissance" hasFeedback >
                        <DatePicker name="date_naissance" onChange={hadleChagedate} initialValues={dayjs('2025-06-12', "YYYY-MM-DD")} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name={"role"} rules={[
                        { required: true, message: "Veuillez selectioné un role" }
                    ]}
                        label="Role">
                        <Select onChange={hadleChageSelect} placeholder="--Choix de role" allowClear>
                            <Option value={1} >Administrateur</Option>
                            <Option value={2} >Declarant</Option>
                            <Option value={3} >Assignation</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={"Téléphone"} name={"telephone"} rules={[
                        { "required": true, message: "Veuillez saisir le numero d'appel" }
                    ]}>
                        <Input.OTP name="telephone" onChange={hadleChangePhone} mask={true} type="number" length={7} />
                    </Form.Item>


                    {/** button de validation de formulaire */}
                    <Form.Item label={null} >
                        <Flex vertical gap="small">
                            <Flex gap="small" wrap>
                                <Space size={[8, 16]}>
                                    <Space.Compact>
                                        <Button htmlType="reset" variant="solid" color="danger" >&nbsp; Annuler</Button>
                                        {!values ?
                                            <Button htmlType="submit" variant="solid" color="blue" icon={<SendOutlined style={{ color: "#fff" }} size="large" />} >&nbsp; Envoyer</Button>
                                            :
                                            <Popover content={(
                                                <span> Tous les donné qui seron ajouter par ce bouton seron temporaire</span>
                                            )} title="Title">
                                                <Button htmlType="submit" variant="solid" color="blue" icon={<PlusOutlined style={{ color: "#fff" }} size="large" />} >&nbsp; Ajouter</Button>
                                            </Popover>


                                        }
                                        <Avatar size="large" style={{ width: "6rem", background: "transparent" }} icon={
                                            <Switch onChange={handleShow} checkedChildren="1"
                                                unCheckedChildren="0" defaultValue={false} />} />
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


export default FormUser