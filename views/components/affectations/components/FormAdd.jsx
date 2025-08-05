import { Avatar, Button, Flex, Form, Input, Popover, Select, Space, Spin, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined, SendOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import EmptydataLoad from "../../emptydata";
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


const FormAffectation = ({ agence, user, setTabTemp, tabTemp, setShow }) => {
    const navigate = useNavigate()
    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }
    const initData = {
        user_ref: "",
        agence_ref: "",
        fonction: ""
    }

    const [data, setData] = useState(initData)
    const [values, setValues] = useState(false)
    const [isMatriculeExiste, setIsExisteMatricule] = useState(false)
    const allUser = user
    const allAgence = agence

    /** element manipulant le formulaire */
    const [form] = Form.useForm()
    /** verifie si un utilisateur existe */
    const findOne = async (matricule) => {

        try {
            const fetch = await window.fetch(`${api}/affectation/edit/${matricule}`, {
                headers: headersHttp,
                method: "GET",
            })
            const json = await fetch.json()
            return json;

        } catch (error) {

            return error;
        }

    }
    /** function d'ajout des donné */
    const insert = async (affectation) => {
        try {
            if (affectation) {
                const fetch = await window.fetch(`${api}/affectation/add`, {
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

            return error;
        }

    }


    /**
    * on gere l'action de l'utilisateur
    */
    const onFinish = async () => {

        // on envoie a la base
        const response = await findOne(data.user_ref)

        if (values) {

            if (response?.data.length) {
                setIsExisteMatricule(true)
            } else {
                if (tabTemp.length != 0) {


                    const test = tabTemp.some(matricule => {
                        if (matricule.user_ref === data.user_ref) {
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

            if (response?.data.length) {
                setIsExisteMatricule(true)
            } else {

                const resp = await insert(data)
                if (resp?.message == "error") {
                    resp?.type == "ConstraintViolationError" || resp?.type == "UniqueViolationError" ?
                        setIsExisteMatricule(true) : setIsExisteMatricule(false)
                } else {
                    navigate("/affectation")
                }
            }

        };
    }

    const hadleChageUser = (value) => {
        setData({ ...data, "user_ref": value })

    }
    const hadleChangeAgence = (value) => {
        setData({ ...data, "agence_ref": value })

    }
    const hadleChangeFonction = (value) => {
        setData({ ...data, "fonction": value })
    }
    /** affiche et cache la liste des données temporaire */
    const handleShow = (value) => {
        setShow(value)
        setValues(value)
    }
    useEffect(() => {

        return () => {
        }

    }, [])





    return (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/affectation", { replace: true })}
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

                {
                    user?.length ?

                        <Form  {...formItemLayout}
                            name="form-control"
                            initialValues={{ remember: true }}
                            form={form}
                            onFinish={onFinish}
                            autoComplete="of" style={{
                                maxWidth: "80vh",
                                borderTopLeftRadius: "25px",
                                borderBottomLeftRadius: "15px",
                                borderTopRightRadius: "15px",
                                boxShadow: "0 0 15px purple",
                                borderBottomRightRadius: "25px",
                                marginTop: "10px", backgroundColor: "ButtonFace"
                            }}>

                            <Form.Item label="Utilisateur" name={"user_ref"}
                                help={isMatriculeExiste ? "Impossible d'affecter un utilisateur plusieurs fois" : null}
                                validateStatus={isMatriculeExiste ? "error" : "validating"}
                                rules={[
                                    { required: true, message: "Veuillez selectioné un utilisateur" }
                                ]} style={{ marginTop: "15px" }}>
                                <Select showSearch options={
                                    allUser?.map((val, index) => {
                                        return { key: index, value: val.matricule, label: val.nom + " " + val.prenom }
                                    })

                                }
                                    onChange={hadleChageUser} placeholder="--Choix de l'utilisateur" allowClear />



                            </Form.Item>

                            <Form.Item label="Agence" name={"agence_ref"}

                                rules={[
                                    { required: true, message: "Veuillez selectioné une agence" }
                                ]}>
                                <Select showSearch options={
                                    allAgence?.map((val, index) => {
                                        return { key: index, value: val.code, label: val.libelle + " /" + val.localite }
                                    })}
                                    onChange={hadleChangeAgence} placeholder="--Choix de l'agence" allowClear />

                            </Form.Item>

                            <Form.Item label="Fonction" name={"fonction"}
                                rules={[
                                    { required: true, message: "Veuillez choisir la fonction de l'utilisateur" }
                                ]}>
                                <Select onChange={hadleChangeFonction} placeholder="--Choix de la fonction" allowClear>
                                    <Option value={"Directeur"} >Directeur</Option>
                                    <Option value={"Assistant De la Direction"} >Assistant De la Direction</Option>
                                    <Option value={"Gérant"} >Gérant</Option>
                                    <Option value={"Agent de Credit"}>Agent de Credit</Option>
                                    <Option value={"Caisiere"}>Caisier(e)</Option>
                                    <Option value={"Comptable"} >Comptable</Option>
                                    <Option value={"Electricien"} >Electricien</Option>
                                    <Option value={"Administation de base de donnée"} >Administation de base de donnée</Option>
                                    <Option value={"Maintenance et Reseau informatique"} >Maintenance et Reseau informatique</Option>
                                    <Option value={"Responsable RH"} >Responsable RH</Option>
                                    <Option value={"Femme de Menage"} >Femme de Menage</Option>
                                    <Option value={"Agent de securite"} >Agent de securite</Option>
                                    <Option value={"autres"} >Autres</Option>
                                </Select>
                            </Form.Item>




                            <Form.Item style={{ opacity: "0" }} label="Téléphone">
                                <Input.OTP type="number" length={7} />
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

                        </Form> : <EmptydataLoad title={"Veuillez ajouter un utilisateur !"} />
                }

            </div>

        </Flex>
    )


};


export default FormAffectation