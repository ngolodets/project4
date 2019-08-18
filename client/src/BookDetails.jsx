import React from 'react';

function BookDetails({bookDetails}) {
  let details = bookDetails ? bookDetails : {}
  let url = details.cover ? details.cover : {}

  return (
    <div>
      <img src={url.medium} alt=""/>
      <a href={details.url} target='_blank' rel="noopener noreferrer">{details.title}</a>
      <p>{details.subtitle}</p>
      <p>{details.by_statement}</p>
      <p>{details.notes}</p>
      <p>{details.pagination}</p>
      <p>Publication date: {details.publish_date}</p>
      {details.publish_places && details.publish_places.map((place, i) => (
        <p key={i}>Published in: {place.name}</p>
        ))
      }
      {details.authors && details.authors.map((author, i) => (
        <a href={author.url} target='_blank' key={i} rel="noopener noreferrer">Author(s): {author.name}</a>
        ))
      }
      {details.ebooks && details.ebooks.map((ebook, i) => (
        <a href={ebook.read_url} target='_blank' key={i} rel="noopener noreferrer" >Take a peak</a>
        ))
      }
    </div>
  )
}

export default BookDetails;