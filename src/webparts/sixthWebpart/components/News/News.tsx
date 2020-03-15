import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { INewsProps } from "./INewsProps";

class News extends React.Component<INewsProps, {}> {
  render() {
    return (
      <div className="tile">
        <div
          style={{
            borderBottom: "1px solid rgb(224, 224, 224)",
            padding: "4px",
            display: "flex",
            cursor: "pointer"
          }}
        >
          <div
            style={{
              flexGrow: 1,
              color: "rgb(0, 92, 156)",
              fontWeight: "bold"
            }}
          >
            News
          </div>
          <div className="buttons">
            {/* <Icon iconName="Edit" style={{fontSize:"16px"}}></Icon> */}
            <Icon
              iconName="Delete"
              style={{ fontSize: "16px", display:"none" }}
              onClick={() => this.props.removeTile("News")}
            ></Icon>
          </div>
        </div>
        <div>
          <p style={{ textAlign: "justify" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s.
          </p>
        </div>
      </div>
    );
  }
}

export default News;
