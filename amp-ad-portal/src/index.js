import React from "react"
import ReactDOM from "react-dom"
import "./style/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css"
import "./style/bootstrap-3.3.7-dist/css/bootstrap.min.css"
import "./style/index.css"
import "./style/style.css"
import { BarLoader } from "react-spinners"
import App from "./App"
//import registerServiceWorker from "./registerServiceWorker"
import * as SynapseClient from "./synapse/SynapseClient"
import { queryTable } from "./queries/queryForData"

let rawSynapseData
let loginKey

const login = async () => SynapseClient.login("mikeybkats", "guinness").then((keys) => {
  loginKey = keys
  return keys
})

const table = "syn12532774"
const speciesQuery = `SELECT species, assay, tissue, diagnosis, specimenID, COUNT(*) FROM ${table} GROUP BY assay, tissue, species, diagnosis`

login()
  .then((token) => {
    ReactDOM.render(
      <div className="front-page-bar">
        <BarLoader color="#47357B" loading />
      </div>,
      document.getElementById("root"),
    )
    return queryTable(table, speciesQuery, token)
  })
  .then((response) => {
    rawSynapseData = JSON.parse(response)
  })
  .then(() => ReactDOM.render(
    <App loginToken={loginKey} appData={rawSynapseData} />,
    document.getElementById("root"),
  ))

//registerServiceWorker()
