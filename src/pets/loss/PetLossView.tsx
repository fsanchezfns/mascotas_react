import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { goHome } from "../../common/utils/Tools"
import "../../styles.css"
import { newLoss, getLosses, getLoss, update,loadLoss } from "./lossService"
import DangerLabel from "../../common/components/DangerLabel"
import FormInputReadOnly from "../../common/components/FormInputReadOnly"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormWarnButton from "../../common/components/FormWarnButton"
import FormTitle from "../../common/components/FormTitle"
import Form from "../../common/components/Form"
import GlobalContent from "../../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"


export default function Loss(props: RouteComponentProps<{ petId: string, id:string }>) {
    const [lossId, setLossId] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [phone, setPhone] = useState("")
    const [state, setState] = useState("")
    const [picture, setPicture] = useState("")

    const errorHandler = useErrorHandler()
  
    const loadLossById = async (id: string) => {
        try {
          const result = await loadLoss(id)
          setLossId(result.id)
          setDescription(result.description)
          setDate(result.date)
          setPhone(result.phone)
          setPicture(result.picture)
  

        } catch (error) {
          errorHandler.processRestValidations(error)
        }
    }

  
    useEffect(() => {
      const id = props.match.params.id
      void loadLossById(id)
    
    }, [])
  
    return (
      <GlobalContent>
        <FormTitle>Aviso de Perdida</FormTitle>
  
    
        <Form>  
          <FormInputReadOnly
            label="Descripción"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            errorHandler={errorHandler}
          />
  
          <FormInputReadOnly
            label="Fecha de Perdida"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            errorHandler={errorHandler}
          />

        <FormInputReadOnly
            label="Telefono"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            errorHandler={errorHandler}
        />
  
          <DangerLabel message={errorHandler.errorMessage} />
  
          <FormButtonBar>          
            <FormButton label="Volver" onClick={props.history.goBack} />
          </FormButtonBar>
        </Form>
      </GlobalContent>
    )
  }