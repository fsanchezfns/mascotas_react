import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { goHome } from "../../common/utils/Tools"
import "../../styles.css"
import { newLoss, getLosses, getLoss, update,loadLoss } from "./lossService"
import DangerLabel from "../../common/components/DangerLabel"
import FormInput from "../../common/components/FormInput"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormImageUpload from "../../common/components/FormImageUpload"
import FormWarnButton from "../../common/components/FormWarnButton"
import FormTitle from "../../common/components/FormTitle"
import Form from "../../common/components/Form"
import GlobalContent from "../../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"


export default function Loss(props: RouteComponentProps<{id:string }>) {
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [phone, setPhone] = useState("")
    const [picture, setPicture] = useState("")

    const errorHandler = useErrorHandler()

    const saveClick = async () => {
      errorHandler.cleanRestValidations()
      if (!description) {
        errorHandler.addError("description", "No puede estar vacío")
      }
      if (!date) {
        errorHandler.addError("date", "La fecha no puede estar vacio")
      }
      if (!phone) {
        errorHandler.addError("phone", "No puede estar vacío")
      }
      if (errorHandler.hasErrors()) {
        return
      }

      try {
       const result = await newLoss(props.match.params.id,{description, date, picture,phone })
        
       console.log(result)

       props.history.goBack()
      } catch (error) {
          console.log('se pudrio')
          console.log(error)
        errorHandler.processRestValidations(error)
      }
    }

  
    useEffect(() => {
    }, [])
  

    return (
      <GlobalContent>
        <FormTitle>Aviso de Perdida</FormTitle>
  
    
        <Form>  
          <FormInput
            label="Descripción"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            errorHandler={errorHandler}
          />
  
          <FormInput
            label="Fecha de Perdida"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            errorHandler={errorHandler}
          />

        <FormInput
            label="Telefono"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            errorHandler={errorHandler}
        />


  
        <DangerLabel message={errorHandler.errorMessage} />
  
          <FormButtonBar>
            <FormAcceptButton label="Guardar" onClick={saveClick} /> 
            <FormButton label="Cancelar" onClick={props.history.goBack} />
          </FormButtonBar>
        </Form>
      </GlobalContent>
    )
  }