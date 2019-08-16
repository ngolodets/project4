import React from 'react';

function Favorite({refreshUser, token, user}) {
  handleFavorite(e, book) {
    e.preventDefault();
    // const newFaves = this.state.isFav.slice()
    // const bookIndex = newFaves.indexOf(book);
    const current = this.props.book;
    // const user = this.props.user;
    let config = {
        headers: {
            Authorization: `Bearer ${this.props.token}`
        }
    }
    axios.post('/api/books', current, config)
        .then( (response) => {
            refreshUser()
        })
}
}

export default Favorite;