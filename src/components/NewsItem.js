import React from 'react'
const NewsItem = (props) => {
    let {title,description,imageUrl,newsUrl,author,date,source} = props;  
    return (
      <>
            <div className="card  d-flex align-items-stretch" style={{width:'100%',height:'100%',backgroundCover:'contain'}}>
                <img style={{height:'200px'}} src={imageUrl} className="card-img-top img-responsive" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title.slice(0,40)}...</h5>
                    <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'-1px',top:'-1px'}}>
                    <span className="badge rounded-pill bg-danger"> {source}</span>
                    </div>
                    <p className="card-text">{description.slice(0,80)}...</p>
                    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary btn-dark">Read More</a>
                </div>
            </div>
      </>
    )
}

export default NewsItem
