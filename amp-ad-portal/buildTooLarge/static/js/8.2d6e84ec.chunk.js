webpackJsonp([8],{98:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),c=n.n(i),s=n(1),u=n.n(s),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=function(e){function t(){var e,n,a,i;r(this,t);for(var c=arguments.length,s=Array(c),u=0;u<c;u++)s[u]=arguments[u];return n=a=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),a.state={params:{},name:""},i=n,o(a,i)}return a(t,e),l(t,[{key:"componentDidMount",value:function(){this.setState({params:this.props.match.params})}},{key:"render",value:function(){return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row center-xs"},c.a.createElement("div",{className:"col-xs-12 col-sm-10"},c.a.createElement("h1",null,this.state.params.handle))))}}]),t}(i.Component);p.propTypes={token:u.a.string.isRequired,hash:u.a.string.isRequired},t.default=p}});
//# sourceMappingURL=8.2d6e84ec.chunk.js.map