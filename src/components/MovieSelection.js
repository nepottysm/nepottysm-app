import React from 'react';
import {data} from '../movieData';

const IdArray = ['tt3059106', 'tt3766798'];
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  onLoad = () => {
    const myHeaders = new Headers();
    myHeaders.append('Cookie', '__cfduid=d8b427a25fd3615dd62768b0e1dd8d4ca1593616030');
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const temp = IdArray.map((eachId) => {
      fetch(`http://www.omdbapi.com/?apikey=3d9886e5&type=movie&i=${eachId}`, requestOptions)
        .then(response => response.text())
        .then((res) => {
          const arr = [...this.state.result];
          arr.push(res);
          this.setState({ result: arr });
          console.log(arr);
        })
        .catch(error => console.log('error', error));
    });
  }

  render() {
    return (
      <div>
        Find out how much you soar on our nepottysm meter
        <button type="button" onClick={this.onLoad}>Load data</button>
        {/* <div />
        <button type="button" onClick={this.onLoad}>Load data</button>
        <div>
          {this.state.result}
        </div> */}
      </div>
    );
  }
}

export default LandingPage;
