import React, { PropTypes } from 'react'

var FacetValue = React.createClass({
  propTypes: {
    constraint: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    matchAny: PropTypes.func
  },

  match: function () {
    this.props.constraint.match(this.props.value)
    return this.props.search()
  },

  exclude: function () {
    this.props.constraint.exclude(this.props.value)
    return this.props.search()
  },

  matchAny: function (e) {
    if (e.target.checked) {
      this.props.constraint.matchAny(this.props.value)
    }
  },

  render: function () {
    // console.log(this.props.matchAny)
    return (
      <div className="facet-value">
        {
          this.props.matchAny ?
            <input type="checkbox" onClick={this.matchAny} />
          :
            <i className="fa fa-plus-circle action" onClick={this.match}></i>
        }
        &nbsp;
        <span>{ this.props.value.name }</span>
        &nbsp;
        <span>({ this.props.value.count })</span>
        {
          this.props.matchAny ? null :
          <span>
            &nbsp;
            <i className="fa fa-ban action" onClick={this.exclude}></i>
          </span>
        }
      </div>
    )
  }
})

var Facet = React.createClass({
  propTypes: {
    constraint: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired
  },

  getInitialState: function () {
    return { matchAny: false }
  },

  shouldMatchAny: function () {
    var current = this.state.matchAny
    this.setState({ matchAny: !current })
  },

  matchAny: function (value) {
    // if (!this.state.matchAny) return
    console.log(value)
  },

  render: function () {
    var constraint = this.props.constraint
    var search = this.props.search

    return (
      <div className="facet">
        <h4>
          { constraint.name }
          &nbsp;
          <input type="checkbox" checked={this.state.matchAny} onClick={this.shouldMatchAny} />
        </h4>
        <p>{ this.state.matchAny + '' }</p>
        <div>
        {
          constraint.facet.facetValues.map(function(value, i) {
            var key = constraint.name + '-' + i
            return (
              <FacetValue key={key} constraint={constraint} value={value} search={search}
                          matchAny={this.state.matchAny ? this.matchAny : null} />
            )
          }, this)
        }
        </div>
      </div>
    )
  }
})

var Facets = React.createClass({
  propTypes: {
    constraints: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired
  },

  render: function () {
    var constraints = this.props.constraints
    var search = this.props.search

    return (
      <div className="facets">
      {
        Object.keys(constraints).map(function (name) {
          return constraints[name]
        })
        .filter(function (constraint) {
          return constraint.facet && constraint.facet.facetValues
        })
        .map(function (constraint) {
          return (
            <Facet key={constraint.name} constraint={constraint} search={search} />
          )
        })
      }
      </div>
    )
  }
})

Facets.FacetValue = FacetValue
Facets.Facet = Facet

module.exports = Facets
