import React, { Component }from 'react';
import axios from 'axios';
import Posts from '../Posts';
import Pagination from '../Pagination';
import './Subject.css'

const url2 = "http://localhost:8080/API/materias";

export default class Subject extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      loading: false,
      currentPage: 1,
      postsPerPage: 5,
      subjects: [],
    };

   this.handleChange = this.handleChange.bind(this);
   this.getPosts = this.getPosts.bind(this);
  }

  getPosts = async (url1)=>{
    console.log(url1)
    this.setState({loading: true});
    const result = await axios.get (url1);
    this.setState({posts: result.data});
    this.setState({loading: false});
    console.log(result.data.length)
    if(result.data.length === 0){
      this.setState({loading: true})
    }
  };

  handleChange = function (e) {
    const option = e.target.value;
    console.log(option)
    if(option === "Materias..."){
      this.setState({posts: []});
      this.setState({currentPage: 1});
    }else{
      const url1 = 'http://localhost:8080/API/busqueda/' + option;
      this.getPosts(url1);
      this.setState({currentPage: 1})
    }
    
    
  }
  
  componentDidMount(){

    const getIDSubjects = async ()=>{
      const resultSubject = await axios.get (url2);
      this.setState({subjects: resultSubject.data})
      console.log(this.state.subjects)
    };

    getIDSubjects();
    
  }

  render(){

    const { currentPage, postsPerPage, posts, loading} = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost-postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => this.setState({ currentPage: pageNum});
    const nextPage = () => this.setState({currentPage: currentPage + 1});
    const prevPage = () => this.setState({currentPage: currentPage - 1});

    return (
      <div className="container">
        <div className="select">
        <select name="subjects" className="subjects-list" onChange={this.handleChange}>
          <option classname = "default" value="Materias...">Materias...</option>
          {this.state.subjects.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option> 
          ))}
        </select>
        </div>

       <Posts posts={currentPosts} loading={loading} />
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage = {currentPage}/>
      </div>
    )
  }
}

