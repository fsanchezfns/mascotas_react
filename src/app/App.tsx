import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoggedInRoute from "../common/components/LoggedInRoute"
import Info from "../info/Info"
import NewPet from "../pets/NewPet"
import Pets from "../pets/Pets"
import Losses from "../pets/loss/Losses" 
import LossView from "../pets/loss/LossView" 
import PetLossView from "../pets/loss/PetLossView" 
import PetLosses from "../pets/loss/PetLosses" 
import PetLoss from "../pets/loss/PetLoss" 
import PetLossEdit from "../pets/loss/PetLossEdit"
import Profile from "../profile/Profile"
import Login from "../user/Login"
import Password from "../user/Password"
import Register from "../user/Register"
import Welcome from "../welcome/Welcome"
import "./App.css"
import Menu from "./Menu"
import Toolbar from "./Toolbar"

export default function App() {
  return (
    <HashRouter>
      <table className="app_table">
        <thead>
          <tr className="app_toolbar">
            <td colSpan={2} >
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app_menu">
              <Menu />
            </td>
            <td id="content" className="app_content">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route path="/newUser" component={Register} />
              <LoggedInRoute path="/info" component={Info} />
              <LoggedInRoute path="/password" component={Password} />
              <LoggedInRoute path="/profile" component={Profile} />
              <LoggedInRoute path="/pets" component={Pets} />
              <LoggedInRoute path="/editPet" component={NewPet} />
              <LoggedInRoute path="/editPet/:id" component={NewPet} />


              <LoggedInRoute path="/losses" component={Losses} />
              <LoggedInRoute path="/lossView/:id" component={LossView} />
            
              

              <LoggedInRoute path="/pet/:id/loss" component={PetLosses} />
              <LoggedInRoute path="/pet/:id/newloss" component={PetLoss} />
              <LoggedInRoute path="/pet/:pedId/editloss/:id" component={PetLossEdit} />
              <LoggedInRoute path="/pet/:pedId/loss/:id" component={PetLossView} />
            </td>
          </tr>
        </tbody>
      </table>
    </HashRouter >
  )
}
