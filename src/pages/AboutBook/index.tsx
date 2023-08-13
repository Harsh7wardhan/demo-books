import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./style.css";

interface IAboutBook { }

const AboutBook: React.FC<IAboutBook> = (props) => {
  const [id, setId] = useState<string>();
  const [book, setBook] = useState<any>();
  const [isRate, setIsRate] = useState<boolean>(false);
  const [ratingDone, setRatingDone] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);
  const [starArr, setStarArr] = useState<any>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/").pop(); // Get the book ID from the URL
  const ratingArray = [1, 2, 3, 4, 5];

  
  // const getBook = () => {
  //   const id = location.pathname.split("/").pop();
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}get_book/${id}`)
  //     .then((result) => {
  //       setBook(result?.data?.book[0]);
  //       setId(id);
  //     })
  //     .catch((err) => {
  //       console.log(`Error`, err);
  //     });
  // };
  // const getBook = () => {
  //   axios
  //     .get("https://www.googleapis.com/books/v1/volumes?q=Money&key=AIzaSyCS4ROvsyMQFPbHWyf2w4iRLivX36cohSQ")
  //     .then((response) => {
  //       const bookData = response.data.items[0]; // Assuming you want to get the first book
  //       setBook(bookData);
  //       setId(bookData.id);
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };
  const getBook = (bookId: string) => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => {
        const bookData = response.data;
        setBook(bookData);
        setId(bookId);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };



  // const readTheBook = () => {
  //   var win = window.open(
  //     `${process.env.REACT_APP_BACKEND_URL_PUBLIC}${book.pdf_name}`,
  //     "_blank"
  //   );
  //   win?.focus();
  // };

  const readTheBook = () => {
    var win = window.open(
      book?.volumeInfo?.previewLink || "",
      "_blank"
    );
    win?.focus();
  };



  const handleRating = (e: any, rate: number) => {
    setRate(rate);
  };

  const rateTheBook = () => {
    if (!isRate) setIsRate(true);
    else if (id) { // Check if id is defined
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}add_rating/${id}/${rate}`)
        .then((result) => {
          getBook(id);
          setRatingDone(true);
        })
        .catch((err) => {
          console.log(`Error`, err);
        });
    }
  };
  

  const backToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (bookId) {
      getBook(bookId);
    }
  }, [bookId]);

  useEffect(() => {
    let arr = [];
    for (var i = 0; i < rate; i++) arr.push({ isThere: true });
    for (var j = i; j < 5; j++) arr.push({ isThere: false });
    setStarArr(arr);
  }, [rate]);

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col xs={4}>
            <span className="back-to-home" onClick={backToHome}>
              <i className="fa fa-angle-left" aria-hidden="true"></i>&nbsp;
              &nbsp;<span>Back to home</span>
            </span>
          </Col>
        </Row>
        {ratingDone && (
          <>
            <br />
            <Alert variant="success">
              Rating Done!! And the rating is {book?.rating}
            </Alert>
          </>
        )}
      </Container>
      <br />
      <Container>
        <Row>
          <Col xs={4}>
            {/* <div>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${book?.thumbnail_name}`}
                className="book-detail-thumbnail"
                alt="thumbnail"
              />
            </div> */}
            {/* <div>
              {book?.volumeInfo?.imageLinks?.thumbnail && (
                <img
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  className="book-detail-thumbnail"
                  alt="thumbnail"
                />
              )}
            </div> */}
            <div>
              {book?.volumeInfo?.imageLinks?.thumbnail && (
                <img
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  className="book-detail-thumbnail"
                  alt="thumbnail"
                />
              )}
            </div>
          </Col>
          <Col xs={8}>
            <div className="about-book">
              <span className="book-title">{book?.name}</span>
              <span className="author">{book?.author}</span>
              <span className="read-time">
                Book Read Time: <em>{book?.read_time} mins</em>
              </span>
              <span className="book-detail">{book?.details}</span>
            </div>
            <br />
            <div className="summary">Summary</div>
            <div className="rate">
              <div className="rate-left">
                <div className="rating-bar">
                  <div className="rate-bar">
                    <span>5</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                  <div className="rate-bar">
                    <span>4</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                  <div className="rate-bar">
                    <span>3</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                  <div className="rate-bar">
                    <span>2</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                  <div className="rate-bar">
                    <span>1</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                </div>
                <div className="abt">
                  <div className="rate-area">
                    <h2 className="rate-val">
                      {book?.rating}
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </h2>
                    <span>273 reviews</span>
                  </div>
                  <div className="rate-area">
                    <h2 className="rate-val">88%</h2>
                    <span>Recommnded</span>
                  </div>
                </div>
              </div>
              <div className="rate-right">
                {!isRate ? (
                  <span>
                    You have not read this book yet.Click on the button to start
                    rating
                  </span>
                ) : (
                  <div className="star-rating">
                    {rate === 0
                      ? ratingArray.map((rate: number, index: number) => (
                        <div>
                          <i
                            className="fa fa-star star fa-star-null"
                            aria-hidden="true"
                            onClick={(e) => handleRating(e, index + 1)}
                          ></i>
                        </div>
                      ))
                      : starArr?.map((star: any, index: number) => {
                        if (star?.isThere) {
                          return (
                            <div>
                              <i
                                className="fa fa-star star"
                                aria-hidden="true"
                                onClick={(e) => handleRating(e, index + 1)}
                              ></i>
                            </div>
                          );
                        } else {
                          return (
                            <div>
                              <i
                                className="fa fa-star star fa-star-null"
                                aria-hidden="true"
                                onClick={(e) => handleRating(e, index + 1)}
                              ></i>
                            </div>
                          );
                        }
                      })}
                  </div>
                )}
                <br />
                <br />
                <br />
                <span className="rate-button" onClick={rateTheBook}>
                  Rate this book
                </span>
              </div>
            </div>
            <button className="read-button" onClick={readTheBook}>
              Read this book
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutBook;




// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Alert } from "react-bootstrap";
// import { useNavigate , useParams} from "react-router-dom";
// import axios from "axios";
// import "./style.css";

// interface IAboutBook {
//   id: string;
// }

// const AboutBook: React.FC<IAboutBook> = (props) => {
//   const { id } = useParams<{ id: string }>();
//   const [book, setBook] = useState<any>();
//   const [isRate, setIsRate] = useState<boolean>(false);
//   const [ratingDone, setRatingDone] = useState<boolean>(false);
//   const [rate, setRate] = useState<number>(0);
//   const [starArr, setStarArr] = useState<any>([]);

//   const navigate = useNavigate();

//   const ratingArray = [1, 2, 3, 4, 5];

//   const getBookDetails = () => {
//     const id = props.id; // This should be passed as a prop
//     axios
//       .get(`https://www.googleapis.com/books/v1/volumes${id}`)
//       .then((response) => {
//         setBook(response.data);
//       })
//       .catch((err) => {
//         console.log(`Error`, err);
//       });
//   };

//   const readTheBook = () => {
//     var win = window.open(
//       book?.volumeInfo?.previewLink || "",
//       "_blank"
//     );
//     win?.focus();
//   };

//   const handleRating = (e: React.MouseEvent, rate: number) => {
//     e.preventDefault();
//     setRate(rate);
//   };

//   const rateTheBook = () => {
//     if (!isRate) setIsRate(true);
//     else {
//       // Perform your rating logic here, e.g., send rating to your backend API
//       // Update the ratingDone state and getBookDetails after successful rating
//     }
//   };

//   const backToHome = () => {
//     navigate("/");
//   };

//   useEffect(() => {
//     getBookDetails();
//   }, []);

//   useEffect(() => {
//     let arr = [];
//     for (var i = 0; i < rate; i++) arr.push({ isThere: true });
//     for (var j = i; j < 5; j++) arr.push({ isThere: false });
//     setStarArr(arr);
//   }, [rate]);

//   return (
//     <>
//       <br />
//       <Container>
//         <Row>
//           <Col xs={4}>
//             <span className="back-to-home" onClick={backToHome}>
//               <i className="fa fa-angle-left" aria-hidden="true"></i>&nbsp;
//               &nbsp;<span>Back to home</span>
//             </span>
//           </Col>
//         </Row>
//         {ratingDone && (
//           <>
//             <br />
//             <Alert variant="success">
//               Rating Done!! And the rating is {book?.rating}
//             </Alert>
//           </>
//         )}
//       </Container>
//       <br />
//       <Container>
//         <Row>
//           <Col xs={4}>
//             <div>
//               <img
//                 src={book?.volumeInfo?.imageLinks?.thumbnail}
//                 className="book-detail-thumbnail"
//                 alt="thumbnail"
//               />
//             </div>
//           </Col>
//           <Col xs={8}>
//             <div className="about-book">
//               <span className="book-title">{book?.volumeInfo?.title}</span>
//               <span className="author">{book?.volumeInfo?.authors?.join(", ")}</span>
//               {/* Additional book details */}
//             </div>
//             <br />
//             <div className="summary">Summary</div>
//             <div className="rate">
//               {/* Rating and other details */}
//             </div>
//             <button className="read-button" onClick={readTheBook}>
//               Read this book
//             </button>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default AboutBook;

