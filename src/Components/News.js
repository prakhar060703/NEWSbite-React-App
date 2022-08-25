import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  constructor(){
    super();
    console.log("Hello I am constructor from news components");
    this.state = {
      articles:[],
      loading:false,
      page:1
    }
  }

  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=0f600446b666472795cb0bd8194471ef&page=1&pageSize=20";
    let data= await fetch(url);
    let parsedData = await data.json()
    console .log(parsedData);
    this.setState({articles:parsedData.articles, totalResults: parsedData.totalResults})
  }

  handlePrevClick =  async ()=>{
    console.log("Previous")
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=0f600446b666472795cb0bd8194471ef&page=${this.state.page - 1}&pageSize=20`;
    let data= await fetch(url);
    let parsedData = await data.json()
    console .log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles:parsedData.articles
    })
  }

  handleNextClick = async ()=>{
    console.log("Next")
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){}
  else{

    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=0f600446b666472795cb0bd8194471ef&page=${this.state.page + 1}&pageSize=20`;
    let data= await fetch(url);
    let parsedData = await data.json()
    console .log(parsedData);

    this.setState({
      page: this.state.page + 1,
      articles:parsedData.articles
    })
  }
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NEWSbite - Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <Newsitem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>

        })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>

      </div>
    )
  }
}

export default News