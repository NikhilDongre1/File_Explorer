import { useState } from "react";
import "./styles.css";
import folders from "./data.json";

export default function App() {
  const [data, setData] = useState(folders);

  const renderFolders = (data) => {
    return data?.map((item) => {
      return (
        <div className="nestedFolder">
          <div>{item?.name}</div>
          {item?.isFolder && item?.children?.length ? (
            <div className="nestedChild">{renderFolders(item?.children)}</div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>Folder Structure</h1>

      {renderFolders(data)}
    </div>
  );
}
