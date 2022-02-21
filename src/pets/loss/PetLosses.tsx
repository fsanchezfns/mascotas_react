import React, { useState, useEffect } from "react"
import { getLosses, Loss,findPet } from "./lossService"
import "../../styles.css"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { goHome } from "../../common/utils/Tools"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormTitle from "../../common/components/FormTitle"
import GlobalContent from "../../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"


export default function PetLosses(props: RouteComponentProps<{ id: string }>) {
  const [losses, setLosses] = useState<Loss[]>([])
  const errorHandler = useErrorHandler()

  const loadPetLosses = async (id: string) => {
    try {
      const result = await getLosses(id)
      setLosses(result)
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  const newLossClick = (id:string) => {
    props.history.push("/pet/"+ id +"/newloss")
  }

  const lossViewClick = (id:string, lossId: string, ) => {
    console.log('id'+ id + 'losid'+lossId )
    props.history.push("/pet/" + id + "/loss/" + lossId)
  }

//revisar
  const lossEditClick = (petId:string, lossId: string, ) => {
    console.log('id'+ petId + 'losid'+lossId )

    
    props.history.push("/pet/" + petId + "/editloss/" + lossId)
  }

  const lossFindClick = async(petId:string, lossId: string, ) => {

    try {
     const result = await findPet(petId,lossId)
     console.log(result)

     props.history.goBack()
    }catch (error) {
      
      errorHandler.processRestValidations(error)
    }
  }



  function isEdit(state:string){
    console.log(state)

    if (state =='LOST') return false;

    return true;
  }

  function formatDate(dateString: string): string {
    if (dateString) {
      let dateOk = dateString.substring(0, 10)
      return dateOk;
    }
    else
      return dateString;
  }


  useEffect(() => {
    void loadPetLosses(props.match.params.id)
  }, [])

  return (
    <GlobalContent>
      <FormTitle>Avisos de Perdidas</FormTitle>
      <table id="petslosses" className="table">
        <thead>
          <tr>
            <th> Descripción </th>
            <th> Fecha </th>
            <th> Estado </th>
            <th> </th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {losses.map((loss, i) => {
            return (
              <tr key={i}>
                <td>{loss.description}</td>
                <td>{formatDate(loss.date)}</td>
                <td>{loss.state}</td>
                <td className="text">
                  <img
                    hidden={isEdit(loss.state)}
                    title="Encontre mi mascota"
                    src="/assets/iconfind.png"
                    alt=""
                    onClick={() => lossFindClick(props.match.params.id,loss.id)}
                  />
                </td>
                <td className="text">
                  <img
                    hidden={isEdit(loss.state)}
                    title="Editar"
                    src="/assets/edit.png"
                    alt=""
                    onClick={() => lossEditClick(props.match.params.id,loss.id)}
                  />
                </td>

                <td className="text">
                  <img
                    title="Ver detalles"
                    src="/assets/iconsearch.png"
                    alt=""
                    onClick={() => lossViewClick(props.match.params.id,loss.id)}
                  />
                </td>

              </tr>
            )
          })}
        </tbody>
      </table>

      <FormButtonBar>
        <FormAcceptButton label="Nuevo Aviso" onClick={() => newLossClick(props.match.params.id)}/>
        <FormButton label="Volver"  onClick={props.history.goBack} />
      </FormButtonBar>
    </GlobalContent>
  )
}
