import { Alert, Avatar, Badge, Button, Card, Flex, Layout, List, Skeleton, Space, Watermark } from "antd";
import FormUser from "./components/FormUser";
import { DeleteOutlined, IdcardFilled, RightOutlined, SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
const { Meta } = Card


const UserAdd = () => {
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [tabTemp, setTabTemp] = useState([])
    const [items, setItems] = useState(tabTemp)
    const [lignesave, setLignesave] = useState(0)
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
    }
    const urlApi = import.meta.env.VITE_API

    /** pour la liste temporaire de infinitescroll */
    const fetchData = async () => {
        if (tabTemp.length > 0) {
            setItems([...items, tabTemp]);
            setPage(page + 1);

        } else {
            setHasMore(false);
        }

    };

    /** chargement des donné lors de la monté du composant */

    useEffect(() => {
        fetchData()
    }, [])

    /**function de suppresiion d'un utilisateur sur le tablau temporaire */
    const onDelete = (e, index) => {
        if (e.type == "click") {
            setTabTemp(oldValues => {
                return oldValues.filter((_, i) => i !== index)
            })
        }

    };


    /** function d'envoie des donnés a la base de données */
    const insertdata = async (user) => {
        try {
            if (user) {

                const request = await window.fetch(`${urlApi}/user/add`, {
                    headers: headersHttp,
                    body: JSON.stringify(user),
                    method: "POST",
                })
                return await fetch(request);
            }
            return null

        } catch (error) {
            console.log("erreur", error);
            return null;
        }

    }


    /**function de sauvegarde des donné du tableau temporaire sur le tablau temporaire */

    const onSave = (e, data) => {

        let countligne = 0
        if (e.type == "click") {

            data.map((item, index) => {
                setLignesave(countligne += 1)
                insertdata(item)

                setTabTemp(oldValues => {
                    return oldValues.filter((_, i) => i == index)
                })
            })

        }

    };






    return (
        <>

            <Layout>

                <Card cover={
                    <Watermark height={35} width={100} content={"URSA"}>
                        <h1>
                            &nbsp;&nbsp;<RightOutlined />Ajouter un utilisateur</h1>
                    </Watermark>}>
                    <Space size="large">
                        <Space.Compact>
                            <Flex wrap gap="small">

                                <Meta title={<FormUser setShow={setShow} tabTemp={tabTemp}  setTabTemp={setTabTemp} />} />
                                {show ?
                                    <Badge
                                        count={
                                            <Button icon={<Avatar icon={<SaveOutlined style={{ fontSize: "25px", color: "black" }} />} />}
                                                style={{
                                                    position: "absolute", backgroundColor: "Background",
                                                    padding: "15px",
                                                    boxShadow: "0 0 15px purple", borderRadius: "15px",
                                                    top: "2rem", right: "20rem"
                                                }}
                                                onClick={e => {
                                                    onSave(e, tabTemp)
                                                }} type="default" size="small" variant="solid">{lignesave != 0 ?
                                                    lignesave == 1 ? <Badge color="volcano" style={{ color: "white" }} count={`une ligne a été `} /> :
                                                        lignesave != 1 ? <Badge color="volcano" style={{ color: "white" }} count={`${lignesave} lignes ont été `} /> : null : null}
                                                Enregistrer</Button>

                                        } size="default" status="success" >

                                        {/** tableau de donnée temporaire */}


                                        <div id="scrollableDiv"
                                            style={{
                                                position: "relative",
                                                top: "50px",
                                                marginLeft: "20px",
                                                boxShadow: "0 0 15px purple",
                                                backgroundColor: "ButtonFace", borderRadius: "20px",
                                                height: 400, width: 400, overflow: 'auto', padding: '0 16px',
                                                border: '1px solid rgba(140, 140, 140, 0.35)',
                                            }}>
                                            <InfiniteScroll
                                                next={fetchData}
                                                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                                hasMore={hasMore}
                                                dataLength={tabTemp.length}>
                                                <List
                                                    dataSource={tabTemp}
                                                    renderItem={(item, index) => (
                                                        <List.Item key={item.length}>
                                                            <List.Item.Meta
                                                                title={<Alert
                                                                    message={<Avatar icon={<IdcardFilled />} />}
                                                                    description={`  ${item.matricule}: ${item.nom}  ${item.prenom}`}
                                                                    type="info"
                                                                    action={<Avatar icon={<Button onClick={e => { onDelete(e, index) }}
                                                                        type="link" icon={<DeleteOutlined style={{ color: "red", fontSize: "18px" }} />} />} />}
                                                                />}
                                                            />

                                                        </List.Item>
                                                    )}
                                                />

                                            </InfiniteScroll>
                                        </div>
                                    </Badge> : <> </>
                                }

                            </Flex>

                        </Space.Compact>
                    </Space>
                </Card>
            </Layout>
        </>

    )
}

export default UserAdd;

