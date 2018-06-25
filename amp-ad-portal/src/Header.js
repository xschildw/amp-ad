import React from 'react'
import { Link, withRouter } from 'react-router-dom'
 
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
		{ label: <Link name="Programs" to="/Programs" className="nav-item dropdown">Programs</Link>, value: 'one' },
		{ label: <Link name="Data Use" to="/DataUseRequirements" className="nav-item dropdown">Data Use</Link>, value: 'two' },
		{ label: <Link name="Studies" to="/Studies" className="nav-item dropdown">Studies</Link>, value: 'three' }
	]

//const defaultOption = options[0]

const RouterDropDown = withRouter(({ history }) => (
	<Dropdown 
		options={options} 
		onChange={
			(event) => {
				history.push(event.label.props.to)
			}
		}
		placeholder="About" 
	/>
))

const Header = () => {
  return (
    <header className="row between-xs header center-xs middle-xs">
          <div className="">
            <Link to="/">
							<img className="logo-header" src={require('./images/amp-ad-logo.svg')} alt="amp_ad_logo" />
						</Link>
          </div>
          <div className="col-xs-8">
            <ul className="nav row end-xs">
              <li><Link to="/" className="nav-item active">Home</Link></li>
              <li><Link to="/tools" className="nav-item">Tools</Link></li>
							<li>
								<RouterDropDown />	
							</li>
            </ul>
      </div>
    </header>
  );
}

export default Header