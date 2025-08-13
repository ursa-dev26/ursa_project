import { Card } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import isValuePresent from "../validate.js";
import { useEffect } from "react";



const { Meta } = Card

const HomeDownloader = () => {
    const url = import.meta.env.VITE_API
    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const file = searchParams.get('name');

    /**
      * module de telechargement
      */
    const download = async (filename) => {

        
        

        try {
            const request = await window.fetch(url + "/download/" + filename, {
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

            return true

        } catch (error) {
            new Error(""+error)
            return false

        }
    }

    useEffect(() => {
        if (download(file)) {
            navigate("/ticket")
        }
        
    }, []);

    return (
        isValuePresent(file) ? navigate("/ticket")
            : navigate("/ticket")
    );
}
export default HomeDownloader