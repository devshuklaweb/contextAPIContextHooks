import React,{useEffect,useState  } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>  {

  const [article,setArticle] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);
 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKeyStr}&country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&page=${page}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticle(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
    document.title = `${capitalizeFirstLetter(props.category)} - NewsBaap`;
  }

  useEffect(() => {
    updateNews();
    //35 me line unwanted warning ko hatane ke liye hoti hai.
    // eslint-disable-next-line
  },[]) //run on first time when page load

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKeyStr}&country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&page=${page+1}`;
    setPage(page+1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticle(article.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  }

    return (      
      <>
        <div className="container">
          <h1 className='text-center' style={{ margin: '3px', padding: '3px', marginTop:'90px' }}><u>NewsBaap - Top {capitalizeFirstLetter(props.category)} Headlines</u></h1>
          {loading && <Spinner />}
          <div className="mb-3 border-bottom d-flex justify-content-end"><strong>Total News
            : {totalResults}</strong>
          </div>

            <InfiniteScroll
              dataLength={article.length}
              next={fetchMoreData}
              hasMore={article.length < totalResults}
              loader={<Spinner />}
            >
              <div className="container">
                <div className="row">
                  {/* article?.map  = article? first check array exist then map call*/}
                  {(!loading) && article?.map((element,index) => {
                    element.title = element.title ?? '';
                    element.description = element.description ?? '';
                    return element.title && <div className="col-md-4 my-3" key={index}>
                      <NewsItem source={element.source.name ?? 'Unknown'} author={element.author ?? 'Unknown'} date={element.publishedAt} newsUrl={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage ? element.urlToImage : "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=300"} />
                    </div>
                  })}
                </div>
              </div>
            </InfiniteScroll>
        </div>
      </>
    )
}

// functional component me proptype niche likha jata hai.
// News.defaultProps = {
//   country: 'in',
//   pageSize: 9,
//   category: 'general'
// }

News.propTypes = {
  country: PropTypes.string,
  apikey: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News
