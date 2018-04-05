import React, { PropTypes } from 'react'

var ChicletValue = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired
  },

  clear: function () {
    console.log('clear')
    this.props.value.remove()
    return this.props.search()
  },

  render: function () {
    var name = this.props.name ? this.props.name + ':' : ''
    var value = this.props.value.name || this.props.value.toParam()
    var truncated = (name.length + value.length <= 30) ? value
                    : value.slice(0, 29 - name.length) + '…'
    return (
      <div className="chiclet-value facet-value">
        <span title={ value }>{ name + truncated }</span>
        &nbsp;
        <i className="fa fa-close action" onClick={this.clear}></i>
      </div>
    )
  }
})

var Chiclet = React.createClass({
  propTypes: {
    constraint: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired
  },

  render: function () {
    var constraint = this.props.constraint
    var search = this.props.search
    return (
      <div className="chiclet">
        <div>
        {
          constraint.values.every.map(function(value, i) {
            return (
              <ChicletValue key={ constraint.name + '-' + i } name={constraint.name} value={value} search={search} />
            )
          })
        }
        </div>
        <div>
        {
          constraint.values.none.map(function(value, i) {
            return (
              <del key={ constraint.name + '-' + i }>
                <ChicletValue name={constraint.name} value={value} search={search} />
              </del>
            )
          })
        }
        </div>
      </div>
    )
  }
})

var Chiclets = React.createClass({
  propTypes: {
    constraints: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired
  },

  render: function () {
    var search = this.props.search

    var constraints = Object.keys(this.props.constraints)
    .map(function (name) {
      return this.props.constraints[name]
    }, this)
    .filter(function (constraint) {
      return constraint.active
    })

    return (
      <div className="chiclets">
      {
        constraints.map(function (constraint) {
          return (
            <Chiclet key={constraint.name} constraint={constraint} search={search} />
          )
        })
      }
      </div>
    )
  }
})

// Facets.FacetValue = FacetValue
Chiclets.Chiclet = Chiclet

module.exports = Chiclets
