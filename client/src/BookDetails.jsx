import React from 'react';

const BookDetails = props => {
  let details = props.bookDetails ? props.bookDetails : {}
  let url = details.cover ? details.cover : {}
  
  
  return (
    <div>
      <img src={url.medium} alt=""/>
      <a href={details.url} target='_blank'>{details.title}</a>
      <p>{details.by_statement}</p>
      <p>{details.notes}</p>
      <p>{details.pagination}</p>
      <p>Publication date: {details.publish_date}</p>
      {details.publish_places && details.publish_places.map(place => (
        <p>Published in: {place.name}</p>
        ))
      }
      {details.authors && details.authors.map(author => (
        <a href={author.url} target='_blank'>Author(s): {author.name}</a>
        ))
      }
      {details.ebooks && details.ebooks.map(ebook => (
        <a href={ebook.read_url} target='_blank'>Take a peak</a>
        ))
      }
    </div>
  )
}

export default BookDetails;