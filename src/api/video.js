//export default로 설정하면 하나만 내보낼 수 있다.

import axios from "axios";

// http://localhost:8080/api/
const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// export속성을 주면 두개 이상의 컴포넌트를 내보낼 수 있다.
// async ~ await + axios
export const getCategories = async () => {
  // 기본 URL 이 instance에서 설정 되있기 때문에 그 이후만 치면 된다.
  return await instance.get("category");
};
