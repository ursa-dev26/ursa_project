import { Button, Form, Input, Select } from "antd";
import isValuePresent from "../../validate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const FormEdit = ({ ticket, affectationDefault, array_idassign,listAffectation }) => {

    const navigate = useNavigate()
    const [list, setList] = useState([])


    const api = import.meta.env.VITE_API

    /** definition des entetes des requete */
    const headersHttp = {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": " *"
    }

    /**
     *@function  updateStatusTicket()
     * mis a jour du status
     */
    const updateStatusTicket = async (element) => {
        try {
            const fetch = await window.fetch(`${api}/ticket/update/${element}`, {
                headers: headersHttp,
                body: JSON.stringify({
                    "status": 1
                }),
                method: "PATCH",
                mode: "cors"
            })
            const json = await fetch.json()
            return json
        } catch (error) {
            console.log("err", error);

            return null
        }



    }

    const handleChange = value => {
        setList(value)

    };

    /**
       *@function  ondeleteRecent() 
       *lors de la soumission du formulaire
       */
    const ondeleteRecent = async (id) => {
        try {
            const fetch = await window.fetch(`${api}/assignation/delete/${id}`, {
                headers: headersHttp,
                method: "DELETE",
                mode: "cors"
            })

            const json = await fetch.json()

            if (isValuePresent(json)) {

                navigate(`/assignation/commentaire?code=${ticket}`)
            }
            return json;

        } catch (error) {
            console.log({ "err": error });

            return null
        }

    };

    /**
     *@function  onFinish() 
     *lors de la soumission du formulaire
     */
    const onFinish = () => {


        // assigne les ticket
        list.map(async (value) => {
            try {
                if (isValuePresent(ticket) && isValuePresent(value)) {
                    const fetch = await window.fetch(`${api}/assignation/add`, {
                        headers: headersHttp,
                        body: JSON.stringify({
                            ticket_ref: ticket,
                            affectation_assign: value,
                        }),
                        method: "POST",
                        mode: "cors"
                    })
                    const json = await fetch.json()

                    if (isValuePresent(json)) {
                        updateStatusTicket(ticket)
                        array_idassign?.map(id => {
                            ondeleteRecent(id)

                        })
                    }
                    return json;
                }
                return null
            } catch (error) {
                console.log("err", error);

                return null
            }
        })
    }


   



    return (
        <Form
            name="basicAssign"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginBottom: "20px" }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
        >

            <Form.Item
                label="N° ticket"
            >
                <Input style={{ width: '100%' }} disabled name="ticket_ref" value={ticket} />
            </Form.Item>

            <Form.Item
                label="Assigné à"
            >

                <Select name="user_assign"
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Veuillez selectionner svpl !!"
                    defaultValue={affectationDefault}
                    onChange={handleChange}
                   options={
                        listAffectation?.map((value,ind)=>{
                            return {
                                key:"nosign"+ind,
                                label:value?.nom+" "+value?.prenom,
                                value:value?.id
                            } 
                        } )
                    }
                />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Modifier
                </Button>
            </Form.Item>
        </Form>
    );

};


export default FormEdit