import { useState } from "react";
import "./styles.css";
import folderData from "./data.json";

export default function App() {
  const [isExpanded, setIsExpanded] = useState({});
  const [data, setData] = useState(folderData);

  const handleDelete = (file) => {
    console.log(data);
    const deleteNode = (nodes) => {
      return nodes
        .filter((node) => node.name != file.name)
        .map((node) => {
          if (node?.isFolder && node?.children) {
            return {
              ...node,
              children: deleteNode(node.children),
            };
          }
          return node;
        });
    };
    setData((prev) => deleteNode(prev));
  };
  
  const renderFolders = (data) => {
    return data?.map((item) => {
      return (
        <div className="nestedFolder">
          <div>
            {item.isFolder ? (
              <span
                onClick={() =>
                  setIsExpanded((prev) => {
                    const newstate = { ...prev };
                    newstate[item.name] = !newstate[item.name];
                    return newstate;
                  })
                }
              >
                {isExpanded[item.name] ? "-" : "+"}
              </span>
            ) : null}
            {item?.name}
            <span>
              {item?.isFolder ? (
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmcodSAtIXafKUinbJYZiaHGz1SAINoYQ-RA&s" />
              ) : null}

              <img
                onClick={() => handleDelete(item)}
                src="https://icons.veryicon.com/png/o/miscellaneous/forestry-in-yiliang/delete-316.png"
              />
            </span>
          </div>
          {item?.isFolder && item?.children?.length && isExpanded[item.name] ? (
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
