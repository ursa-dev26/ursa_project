import { Button, Flex, FloatButton, Form, Input, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { LinkOutlined, PaperClipOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableUploadListItem from "./dragandrop";
import isValuePresent from "../../validate.js"
import { useAuth } from "../../auth/AuthContext.jsx";



const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/**
 * composant form ticket
 */

const FormTicket = () => {
    const { tokenAuth, user } = useAuth();

    const navigate = useNavigate()
    const urlapi = import.meta.env.VITE_API
    const [form] = Form.useForm()

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    /** declaration des different etat local utilisé par le composans */
    const [incident, setIncident] = useState({ type: "" })
    const [fileList, setFileList] = useState([]);
    const [listMateriel, setListMateriel] = useState([]);
    const [code, setCode] = useState("");
    const [data, setData] = useState({
        code: code,
        titre: "",
        affectation_ref: user?.id,
        incident: "",
        libelle_incident: "",
        status: 0,
        joinfile: false,
        priorite: "",
        description: ""
    })
    const [isTicketExiste, setIsTicketExiste] = useState(false)

    const generateCode = () => {
        const key = tokenAuth
        let code = ""
        for (let index = 0; index < 3; index++) {
            code += key.charAt(Math.floor(Math.random() * key.length))

        }

        return code
    }



    /**
     * methode d'ajout de ticket
     */
    const getMateriel = async () => {

        try {
            const request = await window.fetch(`${urlapi}/transaction/show`, {
                headers: headersHttp,
                method: "GET",
                mode: "cors"
            })
            const json = await request.json()
            if (isValuePresent(json?.data)) {

                setListMateriel(json?.data)
            }

            return json
        } catch (error) {
            new Error("" + error)

            return []

        }

    }
    /**
     * methode d'ajout de ticket
     */
    const addTicket = async (body) => {

        try {
            const request = await window.fetch(`${urlapi}/ticket/add`, {
                headers: headersHttp,
                method: "POST",
                body: JSON.stringify(body),
                mode: "cors"
            })
            const json = await request.json()

            return json
        } catch (error) {
            new Error("" + error)


            return []

        }

    }

    /** lor de la soumission du formulaire */
    const onFinish = async () => {
        if (isValuePresent(fileList)) {
            const response = await addTicket(data)
            if (response?.message == "succes") {
                // ajoute le derniere element de la liste
                addfile(fileList, response?.data.code)
            } else {
                setIsTicketExiste(true)
            }

        } else {
            const response = await addTicket(data)
            response?.message == "succes" ?
                navigate("/ticket") : null

        }


    }

    /**
     * hook use effect
     */

    useEffect(() => {

        getMateriel()

        if (fileList) {
            fileList.map((values, index) => {
                if (values.status === "error") {
                    setFileList(oldValues => {
                        return oldValues.filter((_, i) => i !== index)
                    })
                }
            })
        }

        setCode(`T${user?.user_ref}` + generateCode())
        if (isValuePresent(fileList)) {
            setData({ ...data, "joinfile": true })
        } else {
            setData({ ...data, "joinfile": false })
        }


    }, [fileList])


    /** liste des options d'incident */
    const listIncident = [
        {
            key: 1,
            label: "Materiel",
            value: "materiel"
        },
        {
            key: 2,
            label: "Reseaux",
            value: "reseaux"
        },
        {
            key: 3,
            label: "Applicatif",
            value: "applicatif"
        },
        {
            key: 4,
            label: "Autre",
            value: "autre"
        }]
    /** lors des changement au nivau des select */
    const hadleChange = event => {
        const { value, name } = event.target
        setData({ ...data, [name]: value })
    }

    const hadleChangeDecription = event => {
        const { value } = event.target
        setData({ ...data, "description": value })
    }

    const hadleChangeSelect = value => {
        setIncident({ "type": value })

        setData({ ...data, "code": code, "incident": value })
    }


    const hadleChangeSelectisLibelechoise = value => {
        setData({ ...data, "libelle_incident": value })
    }


    const hadleChangeSelectPrio = value => {
        setData({ ...data, "priorite": value })
    }

    /** liste des application */
    const listAppli = [
        {
            key: 1,
            label: "SELATIS",
            value: "selatis"
        },
        {
            key: 2,
            label: "Autres",
            value: "autres"
        }]

    /** liste des priorite */
    const listPriorite = [
        {
            key: 1,
            label: "Urgent",
            value: "urgent"
        },
        {
            key: 2,
            label: "A verifier",
            value: "avoir"
        }]

    /** traitement pour uploade */
    const sensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });

    const onDragEnd = ({ active, over }) => {
        if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {

            setFileList(prev => {
                const activeIndex = prev.findIndex(i => i.uid === active.id);
                const overIndex = prev.findIndex(
                    i => i.uid === (over === null || over === void 0 ? void 0 : over.id),
                );

                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };
    const onChange = ({ fileList: newFileList }) => {
        // supprime les fichier nom uploader de la liuste 
        setFileList(newFileList);
    };

    /**
  * methode pour la definition de la requete d'envoie des fichier a la base de donnée
  */
    const addfile = (file, ticket) => {
        let compte = 0
        file.map(async (item) => {
            try {
                await window.fetch(`${urlapi}/file/add`, {
                    headers: headersHttp,
                    method: "POST",
                    body: JSON.stringify({
                        nom: item?.name,
                        extension: getExtensionfile(item?.name),
                        size: item?.size,
                        ticket_ref: ticket
                    }),
                    mode: "cors"
                })
                navigate('/ticket')
                return compte += 1
            } catch (error) {

                new Error("" + error)

                return compte = 0

            }
        })
    }

    /** obtenir l'extension du fichier */

    const getExtensionfile = (name_file) => {
        const splt = name_file.split('.')
        if (splt.length > 1) {
            return splt.pop()
        } else {
            return null
        }
    }


    return (
        <Flex gap="middle" vertical >
            <Flex align="center" gap="middle">

                <Button type="link" onClick={() => navigate("/ticket", { replace: true })}
                    icon={<SwapLeftOutlined style={{ color: "#ff451d", fontSize: "30px" }} size={50} />} >
                    <span style={{ fontSize: "20px" }}>Précédent</span>
                </Button>
            </Flex>

            {/**formulaire de saisie d'utilisateur*/}

            <div style={{
                filter: "blur(0.2px)",
                borderRadius: "5px",
                justifyContent: "center",
            }}>

                <Form {...formItemLayout}
                    name="form-control"
                    initialValues={{ remember: true }}
                    form={form}
                    onFinish={onFinish}
                    style={{
                        maxWidth: 800
                    }}>


                    <Form.Item
                        label="Code"

                        help={isTicketExiste ? "Ce code est deja utilisé" : null}
                        validateStatus={isTicketExiste ? "error" : "validating"}
                        style={{ padding: "10px" }}>

                        <Input onChange={hadleChange} value={code} disabled name="code" placeholder="Saisir le code du ticket" id="code" />
                    </Form.Item>

                    <Form.Item label="Titre" name={"titre"}
                        rules={[{ required: true, message: 'Veuillez entrer le titre!' }]}
                        validateStatus="validating">
                        <Input onChange={hadleChange} name={"titre"} placeholder="Entrer le titre du ticket" id="titre" />
                    </Form.Item>


                    <Form.Item name={"incident"}
                        rules={[
                            {
                                required: true,
                                message: "Veuillez choisir le type d'incident"
                            }
                        ]}
                        label="Incident">
                        <Select options={listIncident} onChange={hadleChangeSelect}
                            placeholder="--Choix de l'agence" allowClear id="incident" />

                    </Form.Item>
                    {
                        incident?.type == "materiel" ?
                            < >
                                <Form.Item name={"materiel"}
                                    rules={[{
                                        required: true,
                                        message: "Selectionner le materiel"
                                    }]}
                                    label="Materiel"
                                    validateStatus="validating">
                                    <Select options={listMateriel?.map((materiel, i) => {
                                      return  {
                                            key: i+"mat",
                                            label: materiel?.adresse_mac,
                                            value: materiel?.libelle
                                        }
                                    } )} onChange={hadleChangeSelectisLibelechoise}
                                        placeholder="--Choix du materiel" allowClear id="incident" />
                                </Form.Item>
                            </> :

                            incident?.type == "applicatif" ?
                                < >
                                    <Form.Item label="Application" name={"nom"}
                                        rules={[{
                                            required: true,
                                            message: "Veuillez choisir l'application !"
                                        }]} >

                                        <Select options={listAppli}
                                            onChange={hadleChangeSelectisLibelechoise}
                                            placeholder="--Choix de l'application" id="nom" allowClear />
                                    </Form.Item>

                                    <Form.Item
                                        label="Description"
                                        validateStatus="validating">
                                        <TextArea onChange={hadleChangeDecription} rows={4} placeholder="description" id="description" />
                                    </Form.Item>
                                </> :
                                < >
                                    <Form.Item
                                        label="Description"
                                        validateStatus="validating">
                                        <TextArea rows={4} onChange={hadleChangeDecription} placeholder="description" id="validating" />
                                    </Form.Item>
                                </>

                    }

                    <Form.Item label="Priorite" name={"priorite"}
                        rules={[{
                            required: true,
                            message: "Veuillez choisir l'ordre de priorite !"
                        }]} >

                        <Select options={listPriorite}
                            onChange={hadleChangeSelectPrio}
                            placeholder="--Priorite--" allowClear id="priorite" />

                    </Form.Item>


                    <Form.Item label={<PaperClipOutlined style={{ fontSize: "20px" }} />} name={"file"}>
                        {


                            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                                <SortableContext items={fileList.map(i => i.uid)} strategy={verticalListSortingStrategy}>
                                    <Upload name="file"
                                        beforeUpload={file => {
                                            const isArchive = file.name.match(/.(zip|7z|rar|tar|gz|cpio|img|tgz)$/)
                                            const isword = file.name.match(/.(docx|doc|docm|dot|dotx|dotm)$/)
                                            const isExcel = file.name.match(/.(xls|xlsx|xlsm|xlsb|xltx|xltm)$/)
                                            const isPowerpoint = file.name.match(/.(ppt|pptx|pptm|potx|potm)$/)
                                            const isAuther = file.name.match(/.(pdf|rtf|txt|xml)$/)
                                            const isImage = file.name.match(/.(jpg|jpeg|png|gif|svg|webp|tiff|tif|bmp|psd|ai|heic|heif|avif|raw|ico|eps)$/)
                                            isword || isExcel || isPowerpoint || isArchive || isAuther || isImage ? true : false

                                        }}
                                        action={urlapi + "/ticket/file"}
                                        fileList={fileList}
                                        onChange={onChange}
                                        itemRender={(originNode, file) => (
                                            <DraggableUploadListItem originNode={originNode} file={file} />
                                        )}
                                    >
                                        <FloatButton
                                            description={" Ajouter un fichier"}
                                            shape="square"
                                            type="default"
                                            style={{ insetBlock: -8, insetInlineStart: 10, width: "15rem", position: "relative" }}
                                            icon={<LinkOutlined />}
                                        />
                                    </Upload>
                                </SortableContext>
                            </DndContext>
                        }

                    </Form.Item>
                    {/** button de validation de formulaire */}
                    <Form.Item label={null}  >

                        <Button variant="solid" type="primary" htmlType="submit"
                            color="blue" >&nbsp; Enregistrer</Button>

                    </Form.Item>
                </Form>
            </div>

        </Flex >
    );

};


export default FormTicket