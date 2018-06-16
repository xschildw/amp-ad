import getToken from './getToken'
import getStudyData from './getStudyData'
import getWikiData from './getWikiData'

import * as SynapseClient  from './synapse/SynapseClient'
//import * as SynapseConstants from './synapse/SynapseConstants'

let allData = {
  tokens: {},
  test: {},
  allSpeciesData: {},
  flyData: {},
  humanData: {},
  mouseData: {},
  ratData: {},
  wikiNewsData: {},
  wikiProgramsData: {},
	wikiContributorsData: {}
};

const addSpaceToHash = string => {
  for( var index = 0; index < string.length; index++){
    if(string[index] === '#' && string[index+1] !== '#' && string[index-1] !== '#'){
      continue
    }
    if(string[index] === '#' && string[index+1] !== '#' && string[index+1] !== ' '){
      string = string.slice( 0, index) + ` ` + string.slice(index + 1, string.length)
    }
  }
	return string;
}

const runAllQueries = () => {
  return SynapseClient.login('mikeybkats', 'guinness').then( tokenResponse => { 
   console.log(tokenResponse);
    return Promise.all([
			getWikiData('409840', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiNewsData = addSpaceToHash(tokenResponse.markdown)}),
			getWikiData('409849', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiProgramData = addSpaceToHash(tokenResponse.markdown)}),
			getWikiData('409848', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiContributorsData = addSpaceToHash(tokenResponse.markdown)}),
      getAllSpeciesMetaData().then( response => { allData.allSpeciesData = response }),
      getSpeciesStudiesMetaData('Human', 'assay', 'humanToken', tokenResponse.sessionToken, 'syn11346063').then( tokenResponse => { allData.humanData = tokenResponse }),
      getSpeciesStudiesMetaData('Mouse', 'assay', 'mouseToken', tokenResponse.sessionToken, 'syn11346063').then( tokenResponse => { allData.mouseData = tokenResponse }),
      getSpeciesStudiesMetaData('Rat', 'assay', 'ratToken', tokenResponse.sessionToken, 'syn11346063').then( tokenResponse => { allData.ratData = tokenResponse }),
      getSpeciesStudiesMetaData('Drosophila melanogaster', 'assay', 'flyToken', tokenResponse.sessionToken, 'syn11346063').then( tokenResponse => { allData.flyData = tokenResponse }),
      
      //getSpeciesStudiesMetaData('All', '', 'allSpeciesDiseaseToken', tokenResponse.sessionToken, 'syn12532715' ).then( response => { 
        //allData.test = response 
      //})
    ])
  })
  .then( run => { 
    return allData 
  })
}

const getAllSpeciesMetaData = () => {
  return setUpQueryToken().then( token => { 
    return runStudyDataQuery(allData.tokens.allSpecies, 1)
  })
}
  
const getSpeciesStudiesMetaData = (columnName, species, queryTokenName = 'default', AUTHENTICATION, TABLEID) => {
  return setUpQueryToken(columnName, [species], TABLEID, queryTokenName)
    .then( data => {
      //columnName = columnName.charAt(0).toUpperCase() + columnName.substr(1);
      //species = species.charAt(0).toLowerCase() + species.substr(1);
      //species = species.replace(/\s/g, '');
      let dataResponse = runStudyDataQuery(allData.tokens[queryTokenName], AUTHENTICATION, TABLEID, 10)
      //console.log(dataResponse)
      return dataResponse
    });
}

const setUpQueryToken = (columnName, facetValue, TABLEID, tokenName = "allSpecies") => {
  return getToken(columnName, facetValue, TABLEID)
  .then(response => response.json())
  .then(result => {
    let dataStateObject = {...allData.tokens}
    dataStateObject[tokenName] = result.token
    allData.tokens = dataStateObject;
    //console.log(allData.tokens)
  });
}

const runStudyDataQuery = (speciesToken, authenticationToken, tableID, limit) => {
  return getStudyData(speciesToken).then( 
    response => { 
      if( response !== undefined ){
        return response
      }
    }
  )
}

export default runAllQueries 
