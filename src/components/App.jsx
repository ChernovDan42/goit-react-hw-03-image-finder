
import { Component } from 'react'
import css from './App.module.css'
import { Searchbar } from './Searchbar/Searchbar'
import fetchImages from './servises/pixabayAPI'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'
import { Modal } from './Modal/Modal'

export class App extends Component{

  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loader: false,
    showModal:false,

  }

  componentDidUpdate(prevProps, prevState) {

    const { searchQuery, page } = this.state

    if (prevState.searchQuery !== searchQuery) {
      this.setState({loader:true})
      fetchImages(searchQuery, page).then(obj => this.setState({ images: [...obj.data.hits]})).finally(()=>this.setState({loader:false}))
    }
    

    if (prevState.page !== this.state.page) {
      this.setState({loader:true})
       fetchImages(searchQuery, page).then(obj => this.setState(prevState=>({ images: [...prevState.images,...obj.data.hits]}))).finally(()=>this.setState({loader:false}))
    
    }
        
  }

  onFormSubmit = (value) => {
     this.setState({ searchQuery: value})
   }
  
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  render(){
  return (
    <div className={css.App}>
      <Searchbar onSubmit={this.onFormSubmit} />
      <ImageGallery images={this.state.images} />
      {this.state.showModal && <Modal><img src="" alt="" /></Modal>}

      {this.state.loader && <Loader/>}
      {this.state.images.length >0 && <Button loadMore={this.onLoadMore } />}
    </div>
  );
}

  
};
