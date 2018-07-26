import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown, getWikiMarkdownSegments } from "../queries/getWikiData"
import { printShowHideSections } from "../model/HandleMarkdown"

const ReactMarkdown = require("react-markdown")

class ProgramsResilienceAD extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581898")
    getWikiMarkdownSegments(
      "581898",
      "programsResilienceAD",
      this.props,
      "syn12666371",
      false,
    )
  }

  render() {
    return (
      <div className="row about research-page program">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Resilience-AD Program
              </h2>
              <p>
                Understand the mechanisms by which gene-environment interactions
                lead to cognitive resilience in the presence of high risk for
                disease.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
          <section className="row center-xs content-row">
            <div className="col-xs-12 col-sm-9">
              <h2>
Projects
              </h2>
              {printShowHideSections(this.props.markdownSegs)}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

ProgramsResilienceAD.propTypes = {
  markdown: PropTypes.string.isRequired,
  markdownSegs: PropTypes.array.isRequired,
}

export default ProgramsResilienceAD