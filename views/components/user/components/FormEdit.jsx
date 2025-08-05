import { Button, DatePicker, Flex, Form, Input, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";

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

const FormEdit = ({ user, setUser }) => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const roledefault = user?.role
    const telephonedefault = user?.telephone
    const dateDefault = user?.date_naissance
    const [role, setRole] = useState(roledefault)
    const [telephone, setTelephone] = useState(telephonedefault)
    const [date, setDate] = useState(dateDefault)
    const [isMatriculeExiste, setIsExisteMatricule] = useState(false)
    const [data, setData] = useState({})


    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }


    useEffect(() => {
        setRole(roledefault)
        setTelephone(telephonedefault)
        setDate(dateDefault)


        

    }, [roledefault, telephonedefault, dateDefault])


    const hadleChagedate = (_, dateStr) => {
        setUser({ ...user, "date_naissance": dateStr })
    }

    const hadleChageSelect = (value) => {
        setUser({ ...user, "role": value })

    }

    const hadleChange = event => {
        const { value, name } = event.target
        setUser({ ...user, [name]: value })


        console.log(user);
        



    }

    const hadleChangePhone = val => {
        setUser({ ...user, "telephone": val })
    }


    /** function d'ajout des donné */
    const update = async (dataUpdate) => {

        try {
            if (dataUpdate) {
                setData({
                    nom: dataUpdate?.nom,
                    prenom: dataUpdate?.prenom,
                    telephone: dataUpdate?.telephone,
                    email: dataUpdate?.email,
                    password:dataUpdate?.password,
                    date_naissance: dataUpdate?.date_naissance,
                    role: dataUpdate?.role,
                })
                const fetch = await window.fetch(`${api}/user/update/${dataUpdate.matricule}`, {
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

        const reqUpdate = await update(user)


        if (reqUpdate?.message == "error") {
            reqUpdate?.type == "ConstraintViolationError" || reqUpdate?.type == "UniqueViolationError" ?
                setIsExisteMatricule(true) : setIsExisteMatricule(false)
        } else {
            navigate("/user")
        }

    }

    return roledefault ? (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/user", { replace: true })}
                    icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                    <span style={{ fontSize: "20px" }}>Précédent</span>
                </Button>
            </Flex>


            <div style={{
                filter: "blur(0.2px)",
                borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center",
            }}>

                <Form
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

                    <Form.Item
                        style={{ marginTop: "15px" }}
                        label="Matricule">

                        <Input name="matricule" disabled value={user?.matricule}
                            onChange={hadleChange}
                            placeholder="Saisir le matricule de l'utilisateur" id="validating" />
                    </Form.Item>

                    <Form.Item

                        label="Nom" validateStatus="validating">
                        <Input name="nom" value={user?.nom} onChange={hadleChange}
                            placeholder="Entrer le nom de l'utilisateur" id="validating" />
                    </Form.Item>

                    <Form.Item
                        label="Prénom"
                        validateStatus="validating">
                        <Input name="prenom" value={user?.prenom} onChange={hadleChange}
                            placeholder="Entrer le prenom de l'utilisateur" id="validating" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        validateStatus="validating">
                        <Input name="email"  value={user?.email} onChange={hadleChange} placeholder="Entrer votre email" id="validating" />

                    </Form.Item> 
                  

                    <Form.Item label="Date de naissance"  >
                        <DatePicker value={dayjs(dateDefault)}
                            onChange={hadleChagedate}
                            name="date_naissance" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item label={"role"} >
                        <Select mode="combobox" value={roledefault}
                            onChange={hadleChageSelect}

                            placeholder="--Choix de role" allowClear>

                            <Option value={1} >Administrateur</Option>
                            <Option value={2} >Declarant</Option>
                            <Option value={3} >Assignation</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={"Téléphone"}>
                        <Input.OTP name="telephone" onChange={hadleChangePhone} value={telephonedefault} mask={true} type="number" length={7} />
                    </Form.Item>
                    {/** button de validation de formulaire */}
                    <Form.Item label={null} >
                        <Flex vertical gap="small">
                            <Flex gap="small" wrap>
                                <Space size="large">
                                    <Space.Compact>
                                        <Button variant="solid" color="danger" >&nbsp; Annuler</Button>

                                        <Button variant="solid" color="blue" htmlType="submit"
                                            icon={<EditOutlined style={{ color: "#fff" }} size="large" />} >&nbsp; Modifier</Button>
                                    </Space.Compact>
                                </Space>

                            </Flex>
                        </Flex>
                    </Form.Item>

                </Form>
            </div>

        </Flex >
    ) : navigate("/user")
}

export default FormEdit;