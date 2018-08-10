import React from "react"
import PropTypes from "prop-types"
//import MarkdownIt from "markdown-it"
//import MarkdownItSynapse from "markdown-it-synapse"
//import HtmlToReact from "html-to-react"
import ShowHideSection from "../components/ShowHideSection"

const ReactMarkdown = require("react-markdown")

//const HtmlToReactParser = HtmlToReact.Parser
//const htmlToReactParser = new HtmlToReactParser()

//const md = MarkdownIt().use(MarkdownItSynapse)

const makeid = () => {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

//<div key={makeid()}>
//{htmlToReactParser.parse(
//md.render(
//props.markdown[index] !== undefined ? props.markdown[index][key] : "",
//),
//)}
//</div>

const buildSection = (index, key, props) => {
  return (
    <ReactMarkdown
      source={
        props.markdown[index] !== undefined ? props.markdown[index][key] : ""
      }
      escapeHtml={false}
      key={makeid()}
      className="react-markdown"
    />
  )
}

const returnJsxFromMarkdown = (markdown) => {
  return (
    <ReactMarkdown
      source={markdown !== undefined ? markdown : ""}
      escapeHtml={false}
    />
  )
}

const printSections = (sectionArray, props, limit = 200) => {
  return sectionArray.map((section, index) => {
    if (index < limit) {
      return buildSection(index, Object.keys(section)[0], props)
    }
    const keyName = `${index}index`
    return <div key={keyName} />
  })
}

const printShowHideSections = (markdowns) => {
  // takes array with multiple markdown objects { synapse#: markdown }
  return markdowns.map((element) => {
    return (
      <ShowHideSection
        content={returnJsxFromMarkdown(element[Object.keys(element)[0]])}
        key={Object.keys(element)[0] + makeid()}
      />
    )
  })
}

buildSection.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export {
  buildSection,
  printSections,
  returnJsxFromMarkdown,
  printShowHideSections,
}
