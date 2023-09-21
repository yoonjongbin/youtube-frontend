import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCategories, addVideo } from "../api/video";
import { useState, useEffect } from "react";

const Header = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 20px 0;
`;

const Create = () => {
  let [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState();
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [select, setSelect] = useState(1);

  const categoryAPI = async () => {
    const result = await getCategories();
    categories = setCategories(result.data);
  };

  useEffect(() => {
    categoryAPI();
  }, []);

  const onClick = () => {
    // console.log("제목 : " + title);
    // console.log("내용 : " + desc);
    // console.log(image);
    // console.log(video);
    // console.log(select);

    // 폼 데이터들을 담기위한 자바스크립트가 가지고 있는 메소드
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", image);
    formData.append("video", video);
    formData.append("categoryCode", parseInt(select));

    // addVideo한테 폼 데이터를 보낸다.
    addVideo(formData);
  };

  // input 태그에 파일이 들어왔을때
  const onUploadImage = (e) => {
    // e.target.files은 list 타입으로 반환된다.
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const onUploadVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const onChangeCategory = (e) => {
    // select 태그의 현재 해당하는 값을 반환한다.(currentTarget)
    // console.log(e.currentTarget.value);
    setSelect(e.currentTarget.value);
  };

  return (
    <Container>
      <Header>동영상 업로드</Header>

      <br />
      <br />
      <br />

      <Form>
        {/* 제목 입력 */}
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        {/* 내용 입력 */}
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>

        {/* 사진 업로드 */}
        {/* 파일은 직접 지정하면 오류가 생긴다. */}
        <Form.Group className="mb-3">
          <Form.Label>썸네일 이미지</Form.Label>
          <Form.Control type="file" onChange={onUploadImage} />
        </Form.Group>

        {/* 동영상 업로드 */}
        <Form.Group className="mb-3">
          <Form.Label>동영상 파일</Form.Label>
          <Form.Control type="file" onChange={onUploadVideo} />
        </Form.Group>

        {/* 카테고리 선택 */}
        <Form.Select onChange={onChangeCategory} value={select}>
          {categories.map((category) => (
            <option value={category.categoryCode} key={category.categoryCode}>
              {category.categoryName}
            </option>
          ))}
        </Form.Select>

        <Button
          variant="danger"
          style={{ marginTop: "20px" }}
          onClick={onClick}
        >
          저장
        </Button>
      </Form>
    </Container>
  );
};

export default Create;
