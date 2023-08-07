import { Component } from "react";
import css from './Searchbar.module.css'



export class Searchbar extends Component{

    onSubmitForm = (e) => {
        e.preventDefault()
       const value=e.target.elements.searchQuery.value
        this.props.onSubmit(value)
        

    }

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.onSubmitForm}>
                    <button className={css.SearchFormButton} type='submit'></button>
                    <input type="text" className={css.SearchFormInput} name='searchQuery' placeholder="Search images and photos" autoFocus autoComplete="off"/>  
               </form>
            </header>

        )
    }
}