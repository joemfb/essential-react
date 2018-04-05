import React, { PropTypes } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Button
} from 'react-bootstrap'

import debouncePromise from 'debounce-promise'

function makeDebouncer(ms) {
  ms === typeof ms === 'number' && ms || 200
  return debouncePromise(function (f) { return f() }, ms)
}

module.exports = React.createClass({
  propTypes: {
    query: PropTypes.string,
    suggest: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    suggestOnFocus: PropTypes.bool,
    debounce: PropTypes.number
  },

  getInitialState: function () {
    return {
      qtext: '',
      loadingSuggestions: false
    }
  },

  componentWillMount: function () {
    this.debounce = makeDebouncer()
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.debounce) {
      this.debounce = makeDebouncer(nextProps.debounce)
    }

    var qtext = nextProps.query
    if (typeof qtext === 'string' && qtext !== this.state.qtext) {
      this.setState({ qtext: qtext })
    }
  },

  onChange: function (e) {
    var self = this

    this.setState({
      qtext: e.target.value,
      loadingSuggestions: true
    })

    return this.debounce(function () {
      return self.props.suggest(self.state.qtext)
      .then(function (suggestions) {
        self.setState({
          // suggestions: suggestions
          loadingSuggestions: false
        })
        console.log(suggestions)
      })
    })
  },

  onFocus: function (e) {
    if (this.props.suggestOnFocus) {
      return this.onChange(e)
    }
  },

  onSubmit: function (e) {
    e.preventDefault()
    this.props.search(this.state.qtext)
  },

  onClear: function (e) {
    e.preventDefault()
    if (this.state.qtext.length) {
      this.props.search('')
      this.setState({ qtext: '' })
    }
  },

  render: function () {
    return (
      <form className="search-input" onSubmit={this.onSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" name="query" placeholder="Search..." value={this.state.qtext}
                         onChange={this.onChange} onFocus={this.onFocus} />
            {
              !this.state.qtext.length ? null :
              <InputGroup.Button>
                <button className="btn btn-default" onClick={this.onClear} type="reset">
                  <i className="fa fa-close"></i>
                </button>
              </InputGroup.Button>
            }
            <InputGroup.Button>
              <button className="btn btn-default" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </InputGroup.Button>
            <InputGroup.Addon className="loading">
            {
              !this.state.loadingSuggestions ?
                // TODO: find some other way to match the icon width
                <span style={{ display: 'inline-block', width: '12px' }}/>
              :
                <i className="fa fa-refresh fa-spin"></i>
            }
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
})
