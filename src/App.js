import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import Popup from './popup';

const App = observer(class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isOpen: false,
      id: '',
      prdNm: '',
      prdImage01: '',
      htmlDetail: '',
      sellerPrdCd: '',
      selPc: ''
    }
  }

  componentDidMount() {
    this.getList()
  }

  myChangeHandler = (event) => {    
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  togglePopup = (id) => {  
    this.setState({
      isOpen: !this.state.isOpen,
      id: id
    })
  }

  getList() {
    let urlFetch = 'http://localhost:8000/'
    fetch(urlFetch,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json()).then(async (responseJson) => {
        this.setState({
          data: responseJson
        })
      }).catch((error) => {
        console.log(error)
      });
  }

  delete = (id) => {
    let urlFetch = `http://localhost:8000/delete/${id}`
    fetch(urlFetch,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json()).then(async (responseJson) => {
        this.getList()
      }).catch((error) => {
        console.log(error)
      });
  }

  update = () => {
    let urlFetch = `http://localhost:8000/update/${this.state.id}`
    fetch(urlFetch,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'prdNm': this.state.prdNm,
          "prdImage01": this.state.prdImage01,
          'htmlDetail': this.state.htmlDetail,
          'sellerPrdCd': this.state.sellerPrdCd,
          'selPrc': this.state.selPrc
      })
      }).then((response) => response.json()).then(async (responseJson) => {
        console.log(responseJson)
        this.getList()
      }).catch((error) => {
        console.log(error)
      });
  }

  render() {    
    return (
      <div className="App">
        {
          this.state.data.map((item) => {
            return (
              <div class="card">
                <img src={item.prdimage01} className="App-logo" alt="logo" />
                <div class="container">
                  <p>{item.prdnm}</p>
                  <h4><b>Rp. {item.selprc}</b></h4>
                </div>
                <div className="button">
                  <button class="btn delete" onClick={() => this.delete(item.id)}>Delete</button>
                  <button class="btn edit" onClick={() => this.togglePopup(item.id)}>Edit</button>
                </div>                
              </div>
            )
          })
        }
        {
          this.state.isOpen && <Popup
            content={<>
            <form>
              <label>Product Name</label>
              <input type="text" name="prdNm" onChange={this.myChangeHandler}/>
              <label>Product Image</label>
              <input type="text" name="prdImage01" onChange={this.myChangeHandler}/>
              <label>Description</label>
              <input type="text" name="htmlDetail" onChange={this.myChangeHandler}/>
              <label>SKU</label>
              <input type="text" name="sellerPrdCd" onChange={this.myChangeHandler}/>
              <label>Price</label>
              <input type="text" name="selPrc" onChange={this.myChangeHandler}/>
            </form>
            <button class="btn edit" onClick={this.update}>Edit</button>
            </>}
            handleClose={this.togglePopup}
          />
        }
      </div>
    );
  }
});

export default App;
