import React, { useState, useEffect } from "react";
import { Alert, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IAddBook {}

interface IInputProps {
  name : string,
  author : string,
  read_time : string,
  details : string,
  thumbnail_name : string,
  pdf_name : string
}

const AddBook: React.FC<IAddBook> = (props) => {
  const [input, setInput] = useState<IInputProps>({
    name: "",
    author: "",
    read_time: "",
    details: "",
    thumbnail_name: "",
    pdf_name: "",
  });
  const [thumbnail, setThumbnail] = useState<any>();
  const [pdf, setPdf] = useState<any>();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleUpload1 = () => {
    document.getElementById("thumbnail_name")?.click();
  };

  const handleUpload2 = () => {
    document.getElementById("pdf_name")?.click();
  };

  const handleInputChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: any, key: any) => {
    setInput({ ...input, [key]: e.target.files[0].name });

    if (key === "thumbnail_name") setThumbnail(e.target.files[0]);
    else setPdf(e.target.files[0]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uploadFile = async (fileType: string) => {
    const formData = new FormData();
    let url = `${process.env.REACT_APP_BACKEND_URL}upload_file`;

    if (fileType === "thumbnail")
      formData.append("file", thumbnail, input.thumbnail_name);
    else formData.append("file", pdf, input.pdf_name);

    try {
      let response = await axios.post(url, formData);
      console.log(`Response`, response);
    } catch (err) {
      console.log(`File1`, err);
    }
  };

  const handleSubmit = async (e: any) => {
    let url = "http://localhost:3001/add_book";
    e.preventDefault();

    try {
      let response = await axios.post(url, {
        name: input.name,
        author: input.author,
        read_time: input.read_time,
        details: input.details,
        thumbnail_name: input.thumbnail_name,
        pdf_name: input.pdf_name,
      });
      console.log(`Response`, response);
      setIsSubmitted(true);
      setIsError(false);
    } catch (err) {
      console.log(`File2`, err);
      setIsError(true);
    }
  };

  const backToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    uploadFile("thumbnail");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnail]);

  useEffect(() => {
    uploadFile("pdf");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf]);

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col xs={4}>
            <span className="back-to-home" onClick={backToHome}>
              {" "}
              <i className="fa fa-angle-left" aria-hidden="true"></i>&nbsp;
              &nbsp;<span>Back to home</span>
            </span>
          </Col>
        </Row>
        {isSubmitted && (
          <>
            <br />
            <Alert variant="success">Book has been successfully added</Alert>
          </>
        )}
        {isError && (
          <>
            <br />
            <Alert variant="warning">Error in adding book</Alert>
          </>
        )}
      </Container>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col xs={4}>
              <div className="add-book-cover">
                <div className="add-book-cover-1" onClick={handleUpload1}>
                  {!thumbnail ? (
                    <>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="thumbnail_name"
                        name="thumbnail_name"
                        onChange={(e) => handleFileUpload(e, "thumbnail_name")}
                      />
                      <span>+</span>
                      <em>Add Book</em>
                    </>
                  ) : (
                    <span>{thumbnail.name} has been uploaded</span>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={8}>
              <div className="input-title">
                <Form.Label htmlFor="name" className="form-label">
                  Name of the book <em className="important">*</em>
                </Form.Label>
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter the published name"
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                />
              </InputGroup>
              <Row>
                <Col xs={6}>
                  <div className="input-title">
                    <Form.Label htmlFor="author" className="form-label">
                      Author of the book <em className="important">*</em>
                    </Form.Label>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Add all the authors comma seperated"
                      id="author"
                      name="author"
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Col>
                <Col xs={6}>
                  <div className="input-title">
                    <Form.Label htmlFor="read_time" className="form-label">
                      Book read time <em className="important">*</em>
                    </Form.Label>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Add time in mins"
                      id="read_time"
                      name="read_time"
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <div className="input-title">
                    <Form.Label htmlFor="details" className="form-label">
                      Book details <em className="important">*</em>
                    </Form.Label>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <Form.Control
                    as="textarea"
                    placeholder="Should not be more than 300 words"
                    style={{ height: "100px" }}
                    id="details"
                    name="details"
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} style={{ marginTop: "10px" }}>
                  <Form.Label htmlFor="details" className="form-label">
                    Upload Pdf <em className="important">*</em>
                  </Form.Label>
                  <div className="upload-pdf">
                    {!pdf ? (
                      <>
                        <i
                          className="fa fa-cloud-upload"
                          aria-hidden="true"
                        ></i>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id="pdf_name"
                          name="pdf_name"
                          onChange={(e) => handleFileUpload(e, "pdf_name")}
                        />
                        <span className="upload-title">
                          <em onClick={handleUpload2}>Browse</em> or drop files
                          here
                        </span>
                        <span className="upload-about">
                          Supports:Pdf:upto 10mb
                        </span>
                      </>
                    ) : (
                      <span>{pdf.name} has been uploaded</span>
                    )}
                  </div>
                </Col>
              </Row>
              <button type="submit" className="submit-button">
                Add Book
              </button>
            </Col>
          </Row>
        </Container>
      </form>
    </>
  );
};

export default AddBook;
