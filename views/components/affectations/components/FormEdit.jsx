import { Button, Flex, Form, Input, Select, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, LoadingOutlined, SendOutlined, StopOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
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


const EditAffectation = ({ affectation, agence, user }) => {
    const navigate = useNavigate()

    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }
    const initData = {
        agence_ref: "",
        fonction: ""
    }


    const allUser = user
    const allAgence = agence
    const defaultMatricule = affectation?.user_ref
    const defaultagence = affectation?.agence_ref
    const defaultFonction = affectation?.fonction
    const [data, setData] = useState(initData)
    const [isMatriculeExiste, setIsExisteMatricule] = useState(false)
    const [matriculeDefault, setMatriculeDefault] = useState(defaultMatricule)
    const [agenceDefault, setAgenceDefault] = useState(defaultagence)
    const [fonctionDefault, setFonctionDefault] = useState(defaultFonction)

    useEffect(() => {
        setMatriculeDefault(defaultMatricule)
        setAgenceDefault(defaultagence)
        setFonctionDefault(defaultFonction)
        setData({
            ...data,
            agence_ref: defaultagence,
            fonction: defaultFonction
        })


    }, [])

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

    /** handlechange */

    const hadleChangeAgence = (value) => {
        setData({ ...data, "agence_ref": value })

    }
    const hadleChangeFonction = (value) => {
        setData({ ...data, "fonction": value })

    }

    /** lors de la soumission du formumlaire */


    /**
    * on gere l'action de l'utilisateur
    */
    const onFinish = async () => {

        // on envoie a la base
        if (data.agence_ref == undefined || data.fonction == undefined) {
            setIsExisteMatricule(true)

        } else {

            const response = await findOne(defaultMatricule)

            if (response?.data.length) {
                setIsExisteMatricule(false)
                const resp = await update(data, defaultMatricule)
                if (resp?.message == "error") {
                    resp?.type == "ConstraintViolationError" || resp?.type == "UniqueViolationError" ?
                        setIsExisteMatricule(true) : setIsExisteMatricule(false)
                } else {
                    navigate("/affectation")
                }

            } else {
                const resp = await update(data)
                if (resp?.message == "error") {
                    resp?.type == "ConstraintViolationError" || resp?.type == "UniqueViolationError" ?
                        setIsExisteMatricule(true) : setIsExisteMatricule(false)
                } else {
                    navigate("/affectation")
                }
            }
        }


    }
    /**
     * mettre a jour las donnés
     */
    const update = async (dataUpdate, matricule) => {

        try {
            if (dataUpdate) {
                const fetch = await window.fetch(`${api}/affectation/update/${matricule}`, {
                    headers: headersHttp,
                    body: JSON.stringify(dataUpdate),
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

    return user?.length ? (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/affectation", { replace: true })}
                    icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                    <span style={{ fontSize: "20px" }}>Précédent</span>
                </Button>
            </Flex>


            <div style={{
                filter: "blur(0.2px)",
                borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center",

            }}>


                <Form
                    name="form-control"
                    initialValues={{ remember: true }}
                    form={form}
                    onFinish={onFinish}
                    {...formItemLayout} style={{
                        maxWidth: "100vh",
                        borderTopLeftRadius: "25px",
                        borderBottomLeftRadius: "15px",
                        boxShadow: "0 0 15px purple",
                        borderTopRightRadius: "15px",
                        borderBottomRightRadius: "25px",
                        marginTop: "10px", backgroundColor: "ButtonFace"
                    }}>

                    <Form.Item
                        help={isMatriculeExiste ? "Impossible d'affecter un utilisateur plusieurs fois" : null}
                        validateStatus={isMatriculeExiste ? "error" : "validating"}

                        label="Utilisateur" style={{ marginTop: "15px" }}>
                        <Select disabled name="user_ref" showSearch mode="combobox" value={defaultMatricule} options={
                            allUser.map((val, index) => {
                                return { key: index, value: val.matricule, label: val.nom + " " + val.prenom }
                            })

                        }
                            placeholder="--Choix de l'utilisateur" allowClear />


                    </Form.Item>


                    <Form.Item label="Agence" >
                        <Select name={"agence_ref"} mode="combobox" value={defaultagence}
                            showSearch options={
                                allAgence.map((val, index) => {
                                    return { key: index, value: val.code, label: val.libelle + " /" + val.localite }
                                })}
                            onChange={hadleChangeAgence} placeholder="--Choix de l'agence" allowClear />

                    </Form.Item>

                    <Form.Item label="Fonction">
                        <Select onChange={hadleChangeFonction} name="fonction"
                            mode="combobox" value={defaultFonction}
                            placeholder="--Choix de la fonction" allowClear>
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
                                <Space size="large">
                                    <Space.Compact>
                                        <Button variant="solid" htmlType="reset" color="danger"   >&nbsp; Annuler</Button>
                                        <Button variant="solid" htmlType="submit" color="blue" icon={<EditOutlined style={{ color: "#fff" }} size="large" />} >&nbsp; Modifier</Button>
                                    </Space.Compact>
                                </Space>

                            </Flex>
                        </Flex>
                    </Form.Item>

                </Form>
            </div>

        </Flex>
    ) : <>
        <div style={{
            height: "50vh", alignItems: "center",
            position: "relative", left: "10rem",
            alignContent: "center"
        }} >
            <Spin indicator={<LoadingOutlined style={{ fontSize: 68 }} spin />} />
        </div>

    </>

};


export default EditAffectation