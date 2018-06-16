import React, { Component } from 'react'
import PieChart from "react-svg-piechart"
//import PropTypes from 'prop-types'

let colorsTissues = [
  '#F27277',
  '#EB8231',
  '#FAD591',
  '#B22D6B',
  '#F47E6C',
  '#FAD591',
  '#CC3F45',
  '#F89C55',
  '#FF9CA0',
  '#DE9A1F',
  '#BD422F',
  '#F7A6CC',
  '#9C141A',
  '#F683B9',
  '#FACFAF',
  '#FCA79A',
  '#C94281',
  '#C25D10',
  '#FFE2AD',
  '#B2242A',
  '#F7E2DF',
  '#D46D1E',
  '#CF8C15',
  '#FFC5BD',
  '#DA614F',
  '#F7C6DD',
  '#F5B33C',
  '#F5B584',
  '#E566A1',
  '#E0585D',
  '#FCCB6F'
  ];
let colorsAssays = [
  '#94C9EB',
  '#93ABE8',
  '#5BB0B5',
  '#109488',
  '#05635B',
  '#C5EDF0',
  '#42C7BB',
  '#47337D',
  '#3C4A63',
  '#3F833F',
  '#B2A5D1',
  '#6279A1',
  '#6DB56D',
  '#407BA0',
  '#3F5EAB',
  '#C0EBC0',
  '#77AFD4',
  '#7692D9',
  '#5BB0B5',
  '#10847A',
  '#C7D6FF',
  '#A6DDE0',
  '#24AB9F',
  '#47337D',
  '#24334F',
  '#A9EBE5',
  '#907FBA',
  '#4A5E81',
  '#58A158',
  '#2B688F',
  '#ABBEE0',
  '#A7DBA7',
  '#5B95BA',
  '#5171C0',
  '#2F8E94',
  '#BCE0F7',
  '#B1C6FA',
  '#7EC8CC',
  '#109488',
  '#332069',
  '#E1F4F5',
  '#63DBD0',
  '#5A478F',
  '#3C4A63',
  '#58A158',
  '#D5CFE3',
  '#849BC4',
  '#87C987',
  '#407BA0',
  '#5171C0'
];

class PiesBelowHeader extends Component{
  getCountsList = columnName => {
    let countsList = this.props.getColumnNameTypeAndCount(columnName, this.props.pageData) 
    //console.log(countsList);
    countsList
      .sort( (a, b) => {
        return a.count - b.count;
      })
      .reverse()
    return countsList
  }

  printTotalCounts = listArray => {
    let counts = [];
    listArray.forEach( (element, index) => {
      if(index > 0){
        counts.push(element.count); 
      }
    }) 
    if( counts.length > 0 ){ 
      counts = counts.reduce(this.props.getSum);
    }
    return <div>{counts}</div>;
  }

  printCountsList = (listArray, dataType) => {
    let colors;
    if( dataType === 'tissue' ){
      colors = colorsTissues
    }else { colors = colorsAssays }
    let list = listArray.map( (element, index) => {
      if(index > 0){
        return (
          <div className="pie-list row middle-xs" key={index}>
            <div className="pie-circle col-xs" 
              style={{'backgroundColor': colors[index%colors.length]}}
            ></div>
            <p className="pie-list-item col-xs">{element.value} ({element.count} biosamples)</p>
          </div>
        ); 
      }
      return ''
    })  
    return <div className="row"><div className="col-xs-12">{list}</div></div>
  }

  buildPieData = (species = 'All Species', facetsList, dataType ) => {
    let colors;
    if( dataType === 'tissue' ){
      colors = colorsTissues
    }else { colors = colorsAssays }

    if(species === 'All Species'){
      return (
        [{title: "human", value: this.props.getColumnCountForSpecies(this.props.humanData, 'assay'), color: "#89C889"},
        {title: "mouse", value: this.props.getColumnCountForSpecies(this.props.mouseData, 'assay'), color: "#FCCB6F"},
        {title: "fly", value: this.props.getColumnCountForSpecies(this.props.flyData, 'assay'), color: "#907FBA"},
        {title: "rat", value: this.props.getColumnCountForSpecies(this.props.ratData, 'assay'), color: "#77AFD4"}]
      )
    } else return (
      facetsList.map( (element, index) => {
        return {title: element.value, value: element.count, color: colors[index%colors.length]}
      })
    )
  } 

  buildPieSection = (speciesDropdownSelection, dataType) => {
    let pieData = this.buildPieData('this.props.speciesSelection', this.getCountsList(dataType), dataType);
    return (
      <div className="pie-chart-welcome col-xs-12 col-sm-5">
        <div className="pie-container" >
          <h1 className="count">{this.props.pageData[dataType].count} {dataType}</h1>
          <div className="pie-circles-container">
            <div className="chart-center-stat">
              <h1 alt="count of samples">
                {this.printTotalCounts(this.getCountsList(dataType))}
              </h1>
              <p>Biosamples</p>
            </div>
            <PieChart 
              data={pieData}
              expandOnHover={false}
              expandSize={0}
              shrinkOnTouchEnd={false}
              strokeColor="#fff"
              strokeLinejoin="round"
              strokeWidth={0}
              viewBoxSize={50}
            />
          </div>
        </div>
        <div className="pie-counts-list" data-value={this.props.buttonState[dataType+"ButtonAll"]} >
          {this.printCountsList(this.getCountsList(dataType), dataType)}
        </div>
        <button className="pie-counts-button btn" 
          name={dataType+"ButtonAll"} 
          data-value={this.props.buttonState[dataType+"ButtonAll"]} 
          onClick={this.props.toggleSeeAll}>
            {this.props.buttonState[dataType+"ButtonAll"] === false ? "See all " + dataType + 's' : "Show less " + dataType + 's'}
        </button>
      </div>
    )
  }

  componentDidUpdate(){
  }

  render(){
    return (
      <section className="pie-charts-welcome row center-xs">
        <div className="col-xs-12 col-sm-7">
          <div className="row around-xs center-xs">
            {this.buildPieSection(this.props.speciesSelection, 'assay')}
            {this.buildPieSection(this.props.speciesSelection, 'tissue')}
          </div>
        </div>
      </section>
    );
  };
}

//PiesBelowHeader.propTypes = {
//}

export default PiesBelowHeader;
