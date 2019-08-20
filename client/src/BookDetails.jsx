import React from 'react';

function BookDetails({bookDetails, displaySuggestedBooks, displayMoreBooksFromAuthor}) {
  let details = bookDetails ? bookDetails : {}
  let url = details.cover ? details.cover : {}

  return (
    <div className='favebook' onClick={() => {displaySuggestedBooks(details.title)
                                            displayMoreBooksFromAuthor(details.authors[0].name)}}>
      <div className='bookdetails'>
        <a className='link' href={details.url} target='_blank' rel="noopener noreferrer">
          <img src={url.medium} alt="" style={{width: '140px', height: '160px', float: 'left'}}/>
        </a>
        < br/>
        {details.ebooks && details.ebooks.map((ebook, i) => (
          <div style={{margin: '5px', height: 'fit-content'}}>
            <a className='link' href={ebook.read_url} target='_blank' key={i} rel="noopener noreferrer" >{details.title} </a>
            <br />
          </div>
          ))
        }
        {/* <p>{details.subtitle}</p> */}
        <p>{details.by_statement}</p>
        {/* <p>{details.notes}</p> */}
        <p>{details.pagination}</p>
        <p>Publication date: {details.publish_date}</p>
        {details.publish_places && details.publish_places.map((place, i) => (
          <p key={i}>Published in: {place.name}</p>
          ))
        }
        < br/>
        {details.authors && details.authors.map((author, i) => (
          <div>
            <a className='link' href={author.url} target='_blank' key={i} rel="noopener noreferrer">Author(s): {details.authors[0].name}</a>
            <br />
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default BookDetails;