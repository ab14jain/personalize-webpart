import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { BarChart } from "react-easy-chart";
import { IChartProps } from "./IChartProps";

class Chart extends React.Component<IChartProps, {}> {
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
            Chart
          </div>
          <div className="buttons">
            {/* <Icon iconName="Edit" style={{fontSize:"16px", marginRight:"2px"}}></Icon> */}
            <Icon
              iconName="Delete"
              style={{ fontSize: "16px", display: "none" }}
              onClick={() => this.props.removeTile("Chart")}
            ></Icon>
          </div>
        </div>
        <div>
          <BarChart
            colorBars
            height={250}
            width={500}
            data={[
              {
                x: "A",
                y: 46
              },
              {
                x: "B",
                y: 26
              },
              {
                x: "C",
                y: 56
              },
              {
                x: "D",
                y: 65
              },
              {
                x: "E",
                y: 17
              },
              {
                x: "F",
                y: 34
              },
              {
                x: "G",
                y: 47
              },
              {
                x: "H",
                y: 53
              },
              {
                x: "I",
                y: 19
              },
              {
                x: "J",
                y: 9
              },
              {
                x: "K",
                y: 70
              }
            ]}
            margin={{ top: 0, right: 0, bottom: 30, left: 100 }}
          ></BarChart>
        </div>
      </div>
    );
  }
}

export default Chart;
