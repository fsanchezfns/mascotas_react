import React, { useState, useEffect } from "react"
import {loadLosses, Loss} from "./lossService"
import "../../styles.css"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { goHome } from "../../common/utils/Tools"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormTitle from "../../common/components/FormTitle"
import GlobalContent from "../../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"


export default function Losses(props: RouteComponentProps) {
    const [losses, setLosses] = useState<Loss[]>([])
  
    const errorHandler = useErrorHandler()
  
    const loadCurrentLosses= async () => {
      try {
        const result = await loadLosses()
        setLosses(result)
      } catch (error) {
        errorHandler.processRestValidations(error)
      }
    }
  
   /* const editPetClick = (petId: string) => {
      props.history.push("/editPet/" + petId)
    }*/
  
    const newLossClick = () => {
     // props.history.push("/editPet")
    }
  
    useEffect(() => {
      void loadCurrentLosses()
    }, [])
  
    return (
      <GlobalContent>
        <FormTitle>Mascotas Perdidas</FormTitle>
        <table id="petslosses" className="table">
          <thead>
            <tr>
              <th> Descripción </th>
              <th> Fecha </th>
              <th> Estado </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {losses.map((loss, i) => {
              return (
                <tr key={i}>
                  <td>{loss.description}</td>
                  <td>{loss.date}</td>
                  <td>{loss.state}</td>
                  <td className="text">
                    <img
                      src="/assets/edit.png"
                      alt=""
                     // onClick={() => editPetClick(pet.id)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
  
        <FormButtonBar>
          <FormButton label="Cancelar" onClick={() => goHome(props)} />
        </FormButtonBar>
      </GlobalContent>
    )
  }
