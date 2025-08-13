import { EyeOutlined, FilePdfFilled, IdcardFilled } from "@ant-design/icons";
import { Alert, Avatar, Badge, Button, Card, List, Skeleton } from "antd";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FormAdd from "./FormAdd";
import { useEffect } from "react";


const ListNonassigne = () => {

    const urlApi = import.meta.env.VITE_API
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [showinfo, setShowinfo] = useState(false);

    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
    }

    // different etat local
    const [data, setData] = useState([])
    const [dataJoin, setDataJoin] = useState([])
    const [listAffectation, setListAffectation] = useState([])
    const [comptesign, setComptesign] = useState(0)
    const [compteNOsign, setCompteNOsign] = useState(0)
    const [items, setItems] = useState(data.concat(dataJoin))
    /**
     *@function  fetchData()
     * introduit les ticket sur la liste infinitescrolle
     */
    const fetchData = async () => {
        if (data.length > 0) {
            setItems([...items, data]);
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
            const request = await window.fetch(`${urlApi}/ticket/nojoin`, {
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
            const request = await window.fetch(`${urlApi}/ticket/join`, {
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

    /** hook d'effet */

    useEffect(() => {
        fetchDatafileNojoinNoSign()
        fetchDataFileJoinNoSign()
        let compt = 0
        let comptNo = 0
        data.concat(dataJoin).map(val => {
            val?.status == 1 ? compt++ : comptNo++

        })

        setCompteNOsign(comptNo)
        setComptesign(compt)

        getAllAffectation()

    }, []);



    return (
        <div id="scrollableDiv"
            style={{

            }}>


            <InfiniteScroll
                style={{
                    position: "relative",
                    marginBottom: "25px",
                    paddingBottom: "5rem",
                    justifyContent: "center", alignItems: "center", alignContent: "center"
                }}
                next={fetchData}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                hasMore={hasMore}
                height={600}
                dataLength={data.concat(dataJoin)?.length}>
                <List style={{ border: "0px solid transparent" }}
                    dataSource={data.concat(dataJoin)}
                    renderItem={(item, index) => (


                        <List.Item
                            style={{ margin: "0px", padding: "0px", justifyContent: "center", border: "0px" }}
                            key={item?.length}>
                            <List.Item.Meta
                                title={<Alert style={item?.status == 0 ? { background: "#fef9f2" } : {}}
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
                                        <div style={{ display: 'flex', justifyContent: "left" }}>
                                            <div>{item?.nom}&nbsp;&nbsp;{item?.prenom}  </div>&nbsp;&nbsp;
                                            <div>(&nbsp;{`${item.libelle_agence}  ${item.localite_agence}`}&nbsp;)</div>
                                        </div>
                                    }
                                    type="info"
                                    action={item?.joinfile ? <>

                                        {/** widget d'assignation icone pour assigné */}
                                        <Avatar key={"assign"} onClick={
                                            () => {
                                                setShowinfo(!showinfo)
                                                let widget = document.querySelector(".desc" + index)

                                                showinfo ? widget.style.display = "flex" : widget.style.display = "none"
                                            }}
                                            style={{ background: 'green', padding: "1rem", margin: "0.1rem" }} icon={<Button
                                                type="link" icon={<EyeOutlined
                                                    style={{ color: "white", fontSize: "18px" }} />} />} />




                                    </> : <>

                                        {/** widget pour ouvrir les information du commentaire */}

                                        <Avatar onClick={
                                            () => {
                                                setShowinfo(!showinfo)
                                                let widget = document.querySelector(".desc" + index)

                                                showinfo ? widget.style.display = "flex" : widget.style.display = "none"
                                            }
                                        } style={{ background: 'green', padding: "1rem", margin: "0.1rem" }} icon={<Button
                                            type="link" icon={<EyeOutlined
                                                style={{ color: "white", fontSize: "18px" }} />} />} />

                                    </>}
                                />}
                                description={
                                    <div className={"desc" + index} style={{ display: "none", justifyContent: "left" }}>


                                        {/** widget pour d'affichage des infos du ticket */}

                                        <Card size="small" style={{ background: "transparent", border: "1px solid transparent" }} title={null} cover={

                                            <div style={{ display: "flex", justifyContent: "center", float: "right" }}>

                                                {/** widget pour affdiché le formulaire d'assignation */}
                                                {item?.status == 1 ? <></> :

                                                    <div style={{ display: "block", marginBlockEnd: 12 }}>

                                                        <FormAdd ticket={item.code} listAffectation={listAffectation} />

                                                    </div>

                                                }
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
                                                                                                <Button type="link" onClick={(e) => {
                                                                                                    e.preventDefault()
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
        </div >)
}

export default ListNonassigne;


