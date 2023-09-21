import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClapperboard,
  faGamepad,
  faHouse,
  faLightbulb,
  faMedal,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

// export 속성이 달려있는 컴포넌트는 이 방식으로 가져온다.
import { getCategories, getVideos } from "../api/video";

// 태그에 대한 스타일 적용 (``백틱사용)
const Test = styled.div`
  background-color: black;
  color: white;
`;

// aside 태그 대한 scss
const StyledAside = styled.aside`
  display: none;
  position: fixed;
  background-color: white;
  width: 70px;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* 스크롤바 */
  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10px;
  }

  /* 스크롤바 배경 */
  &::-webkit-scrollbar-track {
    background-color: white;
  }

  a {
    display: block;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
    color: black;
    &:hover {
      background-color: #eee;
    }

    p {
      margin-top: 5px;
      font-size: 0.8rem;
    }
  }

  .aside-category,
  footer {
    display: none;
  }
`;

// div 태그에 대한 scss
const MainContent = styled.div`
  &.main-content {
    padding-left: 70px;
  }

  nav {
    position: fixed;
    background-color: white;
    width: 100%;
    height: 56px;
    z-index: 1;
    padding-left: 15px;

    a {
      background-color: #eee;
      padding: 5px 10px;
      border-radius: 5px;
      line-height: 56px;
      margin: 6px;
      color: black;

      &.active {
        background-color: black;
        color: white;
      }
    }
  }

  section {
    padding-top: 56px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .video-content {
      display: block;
      width: 100%;
      max-width: 400px;
      margin: 10px;
      margin-top: 20px;

      video {
        border-radius: 15px;
        height: 220px;
        object-fit: cover;
      }

      .video-summary {
        display: flex;
        margin-top: 10px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .video-desc {
          h3 {
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;

            /* 표시할 글자 라인 (넘어가면 ... 으로 변함)*/
            -webkit-line-clamp: 2;
          }

          p {
            font-size: 0.9rem;
            color: #333;
            line-height: 1.2;
          }
        }
      }
    }
  }
`;

// main 태그에 대한 scss
const StyledMain = styled.main`
  padding-top: 56px;
  display: flex;

  &.aside-change {
    aside {
      width: 70px;

      a {
        flex-direction: column;

        p {
          font-size: 0.8rem;
          margin-top: 5px;
        }
      }
      .aside-category {
        display: none;
      }

      footer {
        display: none;
      }
    }

    .main-content {
      padding-left: 70px;
    }
  }

  @media screen and (min-width: 927px) {
    aside {
      display: block;
    }

    section {
      justify-content: flex-start;
    }
  }

  @media screen and (min-width: 1350px) {
    aside {
      width: 200px;
    }

    aside a {
      display: flex;
    }

    aside a svg {
      width: 30px;
      margin-right: 20px;
    }

    aside a p {
      margin-top: 0;
      font-size: 1rem;
    }

    .main-content {
      padding-left: 200px;
    }

    .aside-category {
      display: block;
    }

    .aside-category h2 {
      /* margin: 22px 22px 0; */
      margin: 22px;
      margin-bottom: 0;
    }

    footer {
      display: block;
      margin: 22px;
    }

    .video-content {
      max-width: 400px;
    }
  }
`;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);

  // async ~ await으로 받았으면 async ~ await에 담아줘야 한다.
  const categoriesAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  const videosAPI = async () => {
    const result = await getVideos();
    console.log(result.data);
    setVideos(result.data);
  };

  useEffect(() => {
    categoriesAPI();
    videosAPI();

    // 카테고리 전체조회 결과값
    // fetch("http://localhost:8080/api/category")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // console.log(json);
    //     setCategories(json);
    //   });
  }, []);

  return (
    <StyledMain>
      <StyledAside>
        <aside>
          <div className="aside-top">
            <a href="#">
              <FontAwesomeIcon icon={faHouse} />
              <p>홈</p>
            </a>

            <a href="#">
              <FontAwesomeIcon icon={faFolder} />
              <p>구독</p>
            </a>
          </div>

          <div className="aside-category">
            <h2>탐색</h2>
            {categories.map((category) => (
              <a href="#" key={category.categoryCode}>
                {category.categoryCode === 1 ? (
                  <FontAwesomeIcon icon={faBagShopping} />
                ) : category.categoryCode === 2 ? (
                  <FontAwesomeIcon icon={faMusic} />
                ) : category.categoryCode === 3 ? (
                  <FontAwesomeIcon icon={faClapperboard} />
                ) : category.categoryCode === 4 ? (
                  <FontAwesomeIcon icon={faGamepad} />
                ) : category.categoryCode === 5 ? (
                  <FontAwesomeIcon icon={faMedal} />
                ) : category.categoryCode === 6 ? (
                  <FontAwesomeIcon icon={faLightbulb} />
                ) : null}
                <p>{category.categoryName}</p>
              </a>
            ))}

            {/* <a href="#">
              <i className="fa-solid fa-music"></i>
              <p>음악</p>
            </a> */}
          </div>

          <footer>개인정보처리방침</footer>
        </aside>
      </StyledAside>

      <MainContent className="main-content">
        <nav>
          <a href="#" className="active">
            전체
          </a>
          {/* <a href="#">쇼핑</a>
          <a href="#">음악</a> */}
          {categories.map((category) => (
            <a href="#" key={category.categoryCode}>
              {category.categoryName}
            </a>
          ))}
        </nav>

        <section>
          {videos.map((video) => (
            <a href="#" className="video-content" key={video.videoCode}>
              <video
                width="100%"
                poster={"/upload/" + video.videoPhoto}
                // autoplay // 리액트에서는 카멜기법으로!!
                autoPlay
                loop
                controls
              >
                {/* 리액트는 절대경로(local)로 접근이 불가능하다. 
                  asset(절대경로)이 불가능하다면 public폴더의 upload(상대경로)에서 접근을 해보자
                  (주의!! public의 upload에서 파일을 가지고 오고 싶다면 
                  서버단에서 파일저장 경로를 수정해줘야 됨)*/}
                <source src={"/upload/" + video.videoUrl} type="video/mp4" />
              </video>

              <div className="video-summary">
                <img
                  src={"/upload/" + video.channel.channelPhoto}
                  alt="채널이미지"
                />

                <div className="video-desc">
                  <h3>{video.videoTitle}</h3>

                  <p>{video.channel.channelName}</p>

                  <p>
                    조회수
                    <span>{video.videoViews}</span>
                    회ㆍ
                    <span>{video.videoDate}</span>전
                  </p>
                </div>
              </div>
            </a>
          ))}
        </section>
      </MainContent>
    </StyledMain>
  );
};

export default Home;
