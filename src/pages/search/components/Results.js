import React, { PropTypes } from 'react'

Match.propTypes = { match: PropTypes.object.isRequired }

function Match (props) {
  return (
    <div className="match">
    {
      props.match['match-text'].map(function matchText(text, i) {
        return (
          <em key={ 'match-text-' + i }>
          {
            text.highlight === undefined ?
            <span>{ text }</span> :
            <span className="highlight">{ text.highlight }</span>
          }
          </em>
        )
      })
    }
    </div>
  )
}

Matches.propTypes = { matches: PropTypes.array.isRequired }

function Matches (props) {
  return (
    <div className="matches">
    {
      props.matches.map(function(match, i) {
        return (
          <Match key={ 'match-' + i } match={match} />
        )
      })
    }
    </div>
  )
}

Result.propTypes = { result: PropTypes.object.isRequired }

function Result (props) {
  return (
    <div className="result">
      <h4>
        <a>{ props.result.uri }</a>
      </h4>
      <Matches matches={props.result.matches} />
      <hr />
    </div>
  )
}

Results.propTypes = { results: PropTypes.array.isRequired }

function Results (props) {
  return (
    <div className="results">
    {
      props.results.map(function(result) {
        return (
          <Result key={result.uri} result={result} />
        )
      })
    }
    </div>
  )
}

Results.Result = Result
Results.Matches = Matches
Results.Match = Match

module.exports = Results
