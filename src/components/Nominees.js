import React from 'react';
import { Nominee } from './Nominee';

export class Nominees extends React.Component {
  constructor(props) {
    super(props);
    //check if there are nominees in local storage
    this.currentNominees =
      localStorage.getItem('nominees') === null
        ? []
        : JSON.parse(localStorage.getItem('nominees'));
  }

  componentDidMount() {
    this.props.addCurrentNominees(this.currentNominees);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.nominees.length > 0 && (
            <div className='panel'>
              <p className='nom-heading'>Your Current Nominees:</p>
              {this.props.nominees.map((nominee, index) => (
                <Nominee movie={nominee} key={index} index={index} />
              ))}
            </div>
        )}
      </React.Fragment>
    );
  }
}
