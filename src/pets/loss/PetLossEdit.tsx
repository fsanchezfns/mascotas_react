import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { goHome } from "../../common/utils/Tools"
import "../../styles.css"
import { getLoss, update } from "./lossService"
import DangerLabel from "../../common/components/DangerLabel"
import FormInput from "../../common/components/FormInput"
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
    const [picture, setPicture] = useState("")
    const [state, setState] = useState("")
    
    const errorHandler = useErrorHandler()
  
    const getLossById = async (petId:string, id: string) => {
    
        try {
          const result = await getLoss(petId,id)
          console.log(result)
          setLossId(result.id)
          setDescription(result.description)
          setDate(result.date)
          setPhone(result.phone)
          setPicture(result.picture)
      
        } catch (error) {
          console.log("todo mal")
          errorHandler.processRestValidations(error)
        }
    
    }

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
       const result = await update(props.match.params.petId,props.match.params.id,{description, date, picture,phone,state})

       props.history.goBack()
      } catch (error) {
      
        errorHandler.processRestValidations(error)
      }
    }
  
    useEffect(() => {
      const petId = props.match.params.petId
      const id = props.match.params.id
      console.log('petId: ' + petId)
      console.log('idLoss' + id)
      void getLossById(petId,id)
    }, [])
  
    return (
      <GlobalContent>
        <FormTitle>Editar Aviso de Pérdida</FormTitle>
  
    
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
            <FormAcceptButton label="Actualizar" onClick={saveClick} />
  
            
  
            <FormButton label="Cancelar" onClick={props.history.goBack}  />
          </FormButtonBar>
        </Form>
      </GlobalContent>
    )
  }