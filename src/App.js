import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            person1: "",
            person2: "",
            data: []
        }
    }

    search() {
        const {person1, person2} = this.state;
        if (person1 !== "" && person2 !== "") {
            let ans = this.getAuthorInfo([], person1, person2, 0);
            console.log(ans);
            return ans;
        }
    }

    getAuthorInfo(currList, author, lookingFor, num) {
        if (num === 2) {
            return "None found :("
        }
        axios.get('https://api.github.com/users/' + author + '/repos?access_token=c40ba93bc7bf168a55d31f23409ae922183c3974')
            .then(res => {
                console.log(res.data);
                res.data.forEach(repo => {
                    axios.get(repo.contributors_url + '?access_token=c40ba93bc7bf168a55d31f23409ae922183c3974').then(result => {
                        result.data.forEach(auth => {
                            console.log(currList);
                            console.log(author);
                            console.log(lookingFor);
                            console.log(num);
                            console.log(repo.name + "\t" + auth.login);
                            // let newList = currList;
                            // newList.push({"repo": repo.name, "author": auth.login});
                            // if (auth.login === lookingFor) {
                            //     return newList;
                            // } else {
                            //     return this.getAuthorInfo(newList, auth.login, lookingFor, num+1);
                            // }
                        })
                    })
                })
            })
    }

  render() {
    const {person1, person2} = this.state;
    return (
      <div className="App">
        <input type="text" onChange={e => this.setState({person1: e.target.value})} value={person1}/>
          <input type="text" onChange={e => this.setState({person2: e.target.value})} value={person2}/>
          <button onClick={() => this.search()}>Search</button>
          <p>{person1}</p>
          <p>{person2}</p>


      </div>
    );
  }
}

export default App;
