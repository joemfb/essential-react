import React from "react";
import styles from "./style.css";


export default class HomePage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    var location = this.props.location
    this.context.router.push({
      pathname: location.pathname
      // ,
      // query: { foo: 'bar' }
      // query: 'foo=bar'
    })
  }

  render() {
    return (
      <div className={styles.content}>
        <h1>Home Page</h1>
        <p className={styles.welcomeText}>Thanks for joining!</p>
      </div>
    );
  }
}
