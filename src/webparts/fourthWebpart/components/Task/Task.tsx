import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { ITaskProps } from "./ITaskProps";

class Task extends React.Component<ITaskProps, {}> {
  // private _onClickhandler(e) {
  //   if (typeof this.props.removeTile === "function") {
  //     console.log("_onClickhandler in Task component");
  //     this.props.removeTile("Task");
  //   }
  // }
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
            Task
          </div>
          <div className="buttons">
            {/* <Icon iconName="Edit" style={{fontSize:"16px"}}></Icon> */}
            <Icon
              iconName="Delete"
              style={{ fontSize: "16px", display:"none" }}
              onClick={() => this.props.removeTile("Task")}
            ></Icon>
          </div>
        </div>
        <div className="mailbox">
          <span className="with-arrow">
            <span className="bg-primary"></span>
          </span>
          <div className="message-center notifications">
            <a href="javascript:void(0)" className="message-item">
              <span className="btn btn-danger btn-circle">
                <i className="fa fa-link"></i>
              </span>
              <span className="mail-contnet" style={{ color: "black" }}>
                <h5 className="message-title">Luanch Admin</h5>
                <span className="mail-desc">
                  Just see the my new admin!
                </span>
                <span className="time">9:30 AM</span>
              </span>
            </a>
            <a href="javascript:void(0)" className="message-item">
              <span className="btn btn-success btn-circle">
                <i className="ti-calendar"></i>
              </span>
              <span className="mail-contnet" style={{ color: "black" }}>
                <h5 className="message-title">Event today</h5>
                <span className="mail-desc">
                  Just a reminder that you have event
                </span>
                <span className="time">9:10 AM</span>
              </span>
            </a>
            <a href="javascript:void(0)" className="message-item">
              <span className="btn btn-info btn-circle">
                <i className="ti-settings"></i>
              </span>
              <span className="mail-contnet" style={{ color: "black" }}>
                <h5 className="message-title">Settings</h5>
                <span className="mail-desc">
                  You can customize this template as you want
                </span>
                <span className="time">9:08 AM</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
