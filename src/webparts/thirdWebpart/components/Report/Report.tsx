import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PieChart } from "react-easy-chart";
import { IReportProps } from "./IReport";

class Report extends React.Component<IReportProps, {}> {
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
            Report
          </div>
          <div className="buttons">
            {/* <Icon iconName="Edit" style={{fontSize:"16px"}}></Icon> */}
            <Icon
              iconName="Delete"
              style={{ fontSize: "16px" }}
              onClick={() => this.props.removeTile("Report")}
            ></Icon>
          </div>
        </div>
        <div>
          <PieChart
            size={230}
            labels
            styles={{
              ".chart_lines": {
                strokeWidth: 0
              },
              ".chart_text": {
                fontFamily: "serif",
                fontSize: "1.25em",
                fill: "#333"
              }
            }}
            data={[
              { key: "India", value: 100, color: "#aaac84" },
              { key: "USA", value: 200, color: "#dce7c5" },
              { key: "China", value: 50, color: "#e3a51a" }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Report;
