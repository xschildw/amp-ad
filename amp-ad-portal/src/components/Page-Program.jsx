import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProgramPage extends Component {
  state = {
    params: {},
    query: '',
    cardQuery: '',
    name: '',
    wikiId: '',
    synId: '',
    jsonKey: '',
    wikiSubHero: '',
  };

  componentDidMount() {
    this.setState(
      {
        params: this.props.match.params,
      },
      () => {
        this.contentRouter()
      },
    )
  }

  handleChanges = (stateObj) => {
    this.setState(stateObj)
  };

  parameters = {
    'AMP-AD': {
      query: "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'AMP-AD' ) )",
      cardQuery:
        "SELECT * FROM syn17024173 where ( ( \"Program\" = 'AMP-AD' ) )",
      wikiId: '581895',
      wikiSubHero: 'programAMPAD_wiki',
      offlineJSON: 'syn17024229_programAMPAD',
    },
    'M2OVE-AD': {
      query: "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )",
      cardQuery:
        "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )",
      wikiId: '581894',
      wikiSubHero: 'programM2OVEAD_wiki',
      offlineJSON: 'syn17024229_programM2OVEAD',
    },
    'Resilience-AD': {
      query:
        "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'Resilience-AD' ) )",
      cardQuery:
        "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'Resilience-AD' ) )",
      wikiId: '581898',
      wikiSubHero: 'programResilienceAD_wiki',
      offlineJSON: 'syn17024229_programResilienceAD',
    },
    'MODEL-AD': {
      query: "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'MODEL-AD' ) )",
      cardQuery:
        "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'MODEL-AD' ) )",
      wikiId: '581896',
      wikiSubHero: 'programMODELAD_wiki',
      offlineJSON: 'syn17024229_programMODELAD',
    },
  };

  contentRouter = (handle = this.state.params.handle) => {
    if (handle !== undefined) {
      const query = this.parameters[handle].query
      const cardQuery = this.parameters[handle].cardQuery
      const wikiId = this.parameters[handle].wikiId
      const jsonKey = this.parameters[handle].jsonKey
      const wikiSubHero = this.parameters[handle].wikiSubHero
      const offlineJSON = this.parameters[handle].offlineJSON
      const synId = 'syn12666371'

      this.handleChanges({
        query,
        cardQuery,
        name: handle,
        wikiId,
        synId,
        jsonKey,
        wikiSubHero,
        offlineJSON,
      })
      return query
    }
  };

  returnSynapseChart = () => {
    if (this.props.synapseLoaded && this.props.token) {
      return (
        <div className="explore-publications">
          <this.props.SynapseComponents.StaticQueryWrapper
            sql={this.state.query}
            token={this.props.token}
          >
            <this.props.SynapseComponents.SynapseTableCardView
              type={this.props.SynapseConstants.AMP_PROJECT}
              limit={50}
            />
          </this.props.SynapseComponents.StaticQueryWrapper>
        </div>
      )
    }
    return (
      <div className="explore-publications">
        <this.props.SynapseComponents.StaticQueryWrapper
          json={this.props.defaultData[this.state.offlineJSON]}
        >
          <this.props.SynapseComponents.SynapseTableCardView
            type={this.props.SynapseConstants.AMP_PROJECT}
            limit={50}
          />
        </this.props.SynapseComponents.StaticQueryWrapper>
      </div>
    )
  };

  style = () => {
    if (window.location.hash.includes('/Programs/')) {
      return {}
    }
    return {}
  };

  returnTitleCard = () => {
    return (
      <div className="hero-card">
        <div className="card-container">
          <this.props.SynapseComponents.StaticQueryWrapper
            sql={this.state.cardQuery}
            token={this.props.token}
          >
            <this.props.SynapseComponents.SynapseTableCardView
              type={this.props.SynapseConstants.AMP_CONSORTIUM}
            />
          </this.props.SynapseComponents.StaticQueryWrapper>
          {this.returnWikiData()}
        </div>
      </div>
    )
  };

  returnWikiData = () => {
    if (this.props.synapseLoaded && this.props.token) {
      return (
        <div className="container wiki-markdown">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-centered">
              <this.props.SynapseComponents.Markdown
                token={this.props.token}
                ownerId={this.state.synId}
                wikiId={this.state.wikiId}
              />
            </div>
          </div>
        </div>
      )
    }
    if (this.props.defaultData[this.state.wikiSubHero]) {
      return (
        <div className="container wiki-markdown">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-centered">
              <this.props.SynapseComponents.Markdown
                markdown={
                  this.props.defaultData[this.state.wikiSubHero].markdown
                }
              />
            </div>
          </div>
        </div>
      )
    }
    return <div />
  };

  render() {
    return (
      <section className="page program-page" style={this.style()}>
        <this.returnTitleCard />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12" />
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-centered">
              <h2 className="header">
                Explore
                {` ${this.state.name}`}
              </h2>
              <this.returnSynapseChart />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ProgramPage.propTypes = {
  token: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  SynapseConstants: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default ProgramPage
