import { Button, Form, Input, Select } from "antd";
import isValuePresent from "../../validate";
import { useNavigate } from "react-router-dom";



const FormAdd = ({ ticket,listAffectation }) => {

    const navigate = useNavigate()


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

            new Error("err" + error);

            return null
        }

    }

    /**
     *@function  onFinish() 
     *lors de la soumission du formulaire
     */
    const onFinish = (value) => {

        // assigne les ticket
        value?.user_assign.map(async (value) => {
            try {
                if (isValuePresent(ticket) && isValuePresent(value)) {
                    const fetch = await window.fetch(`${api}/assignation/add`, {
                        headers: headersHttp,
                        body: JSON.stringify({
                            ticket_ref: ticket,
                            affectation_assign: value,
                            status: 0
                        }),
                        method: "POST",
                        mode: "cors"
                    })
                    const json = await fetch.json()

                    if (isValuePresent(json)) {
                        
                        updateStatusTicket(ticket)
                        navigate(`/assignation/commentaire?code=${ticket} `)
                    }
                    return json;
                }
                return null
            } catch (error) {
                new Error(error)
                return null
            }
        })
    }


    return (
        <Form
            name="basicNoassign"
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
                name="user_assign"
                rules={[{ required: true, message: 'Veuillez choisir un à plusieurs utilisateur' }]}
            >

                <Select name="user_assign"
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Veuillez selectionner svpl !!"
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );

};


export default FormAdd