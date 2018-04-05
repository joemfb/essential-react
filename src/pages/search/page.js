import React from "react";
import styles from "./style.css";

import Input from './components/Input';
import Facets from './components/Facets';
import Chiclets from './components/Chiclets';
import Results from './components/Results';

import MLRest from 'ml-rest.js'
import SearchContext from 'ml-search.js'

const context = SearchContext.create(MLRest.create())

// context.fromParams({ 'c:AddrLocations': "38.79325_-77.11421_38.99544_-76.90976"})

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      constraints: context.constraints,
      results: [],
      q: ''
    }
  },

  componentDidMount: function () {
    // if (this.context.router.isActive('/search')) {
      console.log(this.props.location.query)

      var self = this
      context.ready()
      .then(function () {
        context.fromParams(self.props.location.query)
        // context.constraints.AddrLocations.match({count: 145744, s: 38.79325, w: -77.11421, n: 38.99544, e: -76.90976})
        self.setState({ q: context.qtext })
        self.search()
      })
    // } else {
    //   console.log('what\'s happening here?')
    // }
  },

  componentWillReceiveProps: function (nextProps) {
    console.log('will receive-props')
    var params = context.params()
    var update = nextProps.location.query

    console.log(params)

    if (context.fromParams(update)) {
      console.log('should update from params')

      this.setState({ q: context.qtext })

      context.search().then(response => {
        this.setState({
          loading: false,
          results: response.results
        })
      })
    }
  },

  updateParams: function () {
    console.log('update params')
    var location = this.props.location
    this.context.router.push({
      pathname: location.pathname,
      // TODO: something like Object.assign({}, location.query, context.params())
      query: context.params()
    })
  },

  search: function (q) {
    var nextState = { loading: true }

    if (arguments.length) {
      context.qtext = nextState.q = q
    }

    this.setState(nextState)
    this.updateParams()

    return context.search().then(response => {
      this.setState({
        // constraints: context.constraints,
        loading: false,
        results: response.results
      })
    })
  },

  render: function () {
    return (
      <div className={'row ' + styles.content}>
        <div className="col-md-3">
          <h2>facets here</h2>
          <Chiclets constraints={this.state.constraints} search={this.search} />
          <Facets constraints={this.state.constraints} search={this.search} />
        </div>
        <div className="col-md-9">
          <h2>Search</h2>
          <Input query={this.state.q} search={this.search} suggest={context.suggest.bind(context)} />
          {
            !this.state.loading ? null :
            <i className="fa fa-refresh fa-spin"></i>
          }
          <Results results={this.state.results}/>
        </div>
      </div>
    );
  }
})
