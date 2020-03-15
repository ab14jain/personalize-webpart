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
        <div style={{padding:"0px 5px"}}>
          <p style={{ textAlign: "justify" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
          Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
        </div>
      </div>
    );
  }
}

export default News;
