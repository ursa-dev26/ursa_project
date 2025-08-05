import { CommentOutlined, FilePdfFilled, IdcardFilled, UsergroupAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Badge, Button, Card, List, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import FormEdit from "./FormEdit";
const { Text } = Typography

const ListAssigne = () => {

    const navigate = useNavigate()

    const urlApi = import.meta.env.VITE_API
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
    }


    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([])
    const [listAffectation, setListAffectation] = useState([])

    const [dataJoin, setDataJoin] = useState([])
    const [items, setItems] = useState(data.concat(dataJoin))
    const [showinfo, setShowinfo] = useState(false);


    /** pour la liste temporaire de infinitescroll */
    const fetchData = async () => {
        if (data.concat(dataJoin).length > 0) {
            setItems([...items, data.concat(dataJoin)]);
            setPage(page + 1);

        } else {
            setHasMore(false);
        }



    };


    /**
        *@function  downloadfile()
        *effectue le telechargement en toute securite
        * si le fichier existe 
        */

    const downloadfile = async (filename) => {
        try {
            const request = await window.fetch(urlApi + "/download/" + filename, {
                headers: headersHttp,
                mode: "cors",
                method: "GET"
            })
            const link = document.createElement('a')
            link.href = request.url
            link.setAttribute("download", filename)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            new Error("" + error)


        }
    }


    /**
     * @function fetchDatafileNojoinNoSign
     * 
     * selectione tous les ticket non join par un fichier et non signé  
     */

    const fetchDatafileNojoinNoSign = async () => {
        try {
            const request = await window.fetch(`${urlApi}/assignation/showjoin`, {
                headers: headersHttp,
                mode: "cors",
                method: "GET"
            })
            const json = await request?.json()

            if (json?.message == "succes") {
                setData(json?.data)
                return json?.data
            } else {
                return []
            }
        } catch (error) {
            new Error("" + error)

            return []
        }
    };

    /**
     * @function fetchDataFileJoinNoSign
     * 
     * selectione tous les ticket join par un fichier et non signé  
     */
    const fetchDataFileJoinNoSign = async () => {
        try {
            const request = await window.fetch(`${urlApi}/assignation/shownojoin`, {
                headers: headersHttp,
                mode: "cors",
                method: "GET"
            })
            const json = await request?.json()

            if (json?.message == "succes") {
                setDataJoin(json?.data)

                return json?.data
            } else {

                return []
            }
        } catch (error) {
            new Error("" + error)

            return []
        }
    };

    /**
        * recupere la liste des affectations possible
        * 
        */

    const getAllAffectation = async () => {
        try {
            const fetch = await window.fetch(`${urlApi}/affectation/show`,
                {
                    headers: headersHttp,
                    method: "GET",
                    mode: "cors"
                }
            )
            const json = await fetch.json()
            json?.message == "succes" ?
                setListAffectation(json.data) : setListAffectation([])

        } catch (error) {
            new Error("" + error)
            return null
        }

    }

    useEffect(() => {
        return () => {
            fetchDatafileNojoinNoSign()
            fetchDataFileJoinNoSign()
            getAllAffectation()

        }


    }, []);


    return (
        <div id="scrollableDiv" key={"scrol2"}>

            {
                console.log("assigne", data.concat(dataJoin))

            }

            <Text style={{ wordWrap: 'break-word' }}>
                Vous avez la possibilité de modifier l'assignation sur ce module et de pouvoir telecharger les fichiers joint pour chaque ticket.
            </Text>

            <InfiniteScroll key={"listassigne"}
                style={{
                    position: "relative",
                    marginBottom: "25px",
                    paddingBottom: "10px",
                    justifyContent: "center", alignItems: "center", alignContent: "center"
                }}
                next={fetchData}
                loader={
                    <>
                        <Skeleton key={"ass1"} avatar paragraph={{ rows: 1 }} active />

                    </>
                }
                hasMore={hasMore}
                height={600}
                dataLength={data.concat(dataJoin)?.length}>


                <List style={{ border: "0px solid transparent" }}
                    dataSource={data.concat(dataJoin)}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{ margin: "0px", padding: "0px", justifyContent: "center", border: "0px" }}
                            key={"assigne" + index}>

                            <List.Item.Meta key={"it" + index}
                                title={<Alert
                                    message={
                                        <div style={{ display: 'flex', justifyContent: "left" }}>

                                            <div style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "blue",
                                                fontStyle: "italic",
                                                fontFamily: "monospace",
                                                fontSize: "20px",
                                            }}>
                                                <Badge color="geekblue" count={index + 1 + "/" + data.concat(dataJoin)?.length} />
                                            </div>&nbsp;&nbsp;


                                            <Avatar icon={<IdcardFilled />} />
                                            <div style={{ margin: "3px" }}>{`  ${item.code}: ${item?.incident}`}</div>
                                        </div>
                                    }
                                    description={
                                        <>
                                            <div style={{ display: 'flex', justifyContent: "left" }}>
                                                <div>{item?.nom}&nbsp;&nbsp;{item?.prenom}  </div>&nbsp;&nbsp;
                                                <div>(&nbsp;{`${item.libelle_agence}  ${item.localite_agence}`}&nbsp;)</div>
                                            </div>


                                        </>
                                    }
                                    type="info"
                                    action={item?.joinfile ? <>

                                        {/** widget d'assignation icone pour assigné */}
                                        <Avatar key={"join" + index} onClick={
                                            () => {
                                                setShowinfo(!showinfo)
                                                let widget = document.querySelector(".descA" + index)

                                                showinfo ? widget.style.display = "flex" : widget.style.display = "none"
                                            }}
                                            style={{ background: 'green', padding: "1rem", margin: "0.1rem" }} icon={<Button
                                                type="link" icon={<UsergroupAddOutlined
                                                    style={{ color: "white", fontSize: "18px" }} />} />} />
                                        {/** widget pour ouvrir une commentaire */}

                                        <Avatar key={"comment"} onClick={
                                            () => {
                                                navigate(`/assignation/commentaire?code=${item?.code}`)
                                            }
                                        } style={{ background: 'green', padding: "1rem", margin: "0.1rem" }} icon={<Button
                                            type="link" icon={<CommentOutlined
                                                style={{ color: "white", fontSize: "18px" }} />} />} />



                                    </> : <>

                                        {/** widget pour ouvrir les information du commentaire */}

                                        <Avatar onClick={
                                            () => {
                                                navigate(`/assignation/commentaire?code=${item?.code}`)
                                            }
                                        } style={{ background: 'green', padding: "1rem", margin: "0.1rem" }} icon={<Button
                                            type="link" icon={<CommentOutlined
                                                style={{ color: "white", fontSize: "18px" }} />} />} />
                                        <sub onClick={() => {
                                            setShowinfo(!showinfo)
                                            let widget = document.querySelector(".descA" + index)

                                            showinfo ? widget.style.display = "flex" : widget.style.display = "none"

                                        }}>Lire la suite ...</sub>
                                    </>}
                                />}
                                description={
                                    <div className={"descA" + index} style={{ display: "none", justifyContent: "left" }}>


                                        {/** widget pour d'affichage des infos du ticket */}

                                        <Card size="small" style={{ background: "transparent", border: "1px solid transparent" }} title={null} cover={

                                            <div style={{ display: "flex", justifyContent: "center", float: "right" }}>

                                                {/** widget pour affdiché le formulaire d'assignation */}
                                                <div style={{ display: "block", marginBlockEnd: 12 }}>

                                                    <FormEdit key={"formEdit" + index} array_idassign={item?.idassign}
                                                        listAffectation={listAffectation}
                                                        affectationDefault={item?.affectation} ticket={item.code} />

                                                </div>


                                                {/** widget pour d'affichage des infos du ticket */}
                                                <div style={{ display: "block", marginLeft: "20px" }}>

                                                    {/**1er ligne */}
                                                    <div style={{ display: "flex", padding: "1px" }}>

                                                        <>
                                                            <div style={{ margin: "2px" }}>
                                                                Status:
                                                            </div>
                                                            <div style={{ margin: "2px" }}>
                                                                {item?.status}
                                                            </div>
                                                        </> : <></>

                                                    </div>
                                                    {/**2em ligne */}

                                                    <div style={{ display: "flex", padding: "1px", justifyContent: "left" }}>
                                                        {item?.description != "" ?
                                                            <>
                                                                <div style={{ margin: "2px", justifyContent: "right" }}>
                                                                    Description:
                                                                </div>
                                                                <div style={{ margin: "2px", justifyContent: "left" }}>
                                                                    {item?.description}
                                                                </div>
                                                            </> : <></>
                                                        }
                                                    </div>
                                                    {/**3em ligne piece jointe */}

                                                    <div style={{ display: "flex", padding: "1px", justifyContent: "left" }}>
                                                        {item?.joinfile == true ?
                                                            <>

                                                                <div id="list" style={{ margin: "2px", justifyContent: "left" }}>
                                                                    <List dataSource={item?.file} renderItem={(datafile) => {


                                                                        return (
                                                                            <List.Item style={{
                                                                                margin: "0px",
                                                                                padding: "0px", justifyContent: "center",
                                                                                border: "0px solid white",

                                                                            }}>
                                                                                <List.Item.Meta style={{
                                                                                    margin: "0px",
                                                                                    border: "0px solid white",

                                                                                }}

                                                                                    title={<>
                                                                                        <ul style={{ listStyle: "none", border: "0px solid white", }}>
                                                                                            <li>
                                                                                                <FilePdfFilled style={{ color: "black", fontSize: "30px" }} />&nbsp;&nbsp;
                                                                                                <Button type="link" onClick={() => {
                                                                                                    downloadfile(datafile)

                                                                                                }}>
                                                                                                    {datafile.length > 30 ? datafile : datafile}
                                                                                                </Button>
                                                                                            </li>
                                                                                        </ul>

                                                                                    </>} />
                                                                            </List.Item>
                                                                        )
                                                                    }} />

                                                                </div>


                                                            </> : <></>
                                                        }
                                                    </div>


                                                </div>
                                            </div>

                                        } >

                                        </Card>

                                    </div>

                                }
                            />

                        </List.Item>
                    )} />
            </InfiniteScroll>
        </div >
    )
}

export default ListAssigne;