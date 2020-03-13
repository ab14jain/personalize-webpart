import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { INotificationProps } from "./INotificationProps";

class Notification extends React.Component<INotificationProps, {}> {
  render() {
    let x = 10;
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
            Notification
          </div>
          <div className="buttons">
            {/* <Icon iconName="Edit" style={{fontSize:"16px"}}></Icon> */}
            <Icon
              iconName="Delete"
              style={{ fontSize: "16px" }}
              onClick={() => this.props.removeTile("Notification")}
            ></Icon>
          </div>
        </div>
        <div className="mailbox">
          <div className="message-center message-body ">
            <a href="javascript:void(0)" className="message-item">
              {" "}
              <span className="user-img">
                {" "}
                <img
                  width="40px"
                  src="https://sharepointdevsolutions.sharepoint.com/sites/MigrationData/SiteAssets/images/1.jpg"
                  alt="user"
                  className="rounded-circle"
                />{" "}
                <span className="profile-status online pull-right"></span>{" "}
              </span>{" "}
              <span className="mail-contnet">
                <h5 className="message-title">Pavan kumar</h5>
                <span className="mail-desc">Just see the my admin!</span>{" "}
                <span className="time">9:30 AM</span>{" "}
              </span>{" "}
            </a>

            <a href="javascript:void(0)" className="message-item">
              {" "}
              <span className="user-img">
                {" "}
                <img
                  width="40px"
                  src="https://sharepointdevsolutions.sharepoint.com/sites/MigrationData/SiteAssets/images/1.jpg"
                  alt="user"
                  className="rounded-circle"
                />{" "}
                <span className="profile-status busy pull-right"></span>{" "}
              </span>{" "}
              <span className="mail-contnet">
                <h5 className="message-title">Sonu Nigam</h5>
                <span className="mail-desc">
                  I've sung a song! See you at
                </span>{" "}
                <span className="time">9:10 AM</span>{" "}
              </span>{" "}
            </a>

            <a href="javascript:void(0)" className="message-item">
              {" "}
              <span className="user-img">
                {" "}
                <img
                  width="40px"
                  src="https://sharepointdevsolutions.sharepoint.com/sites/MigrationData/SiteAssets/images/1.jpg"
                  alt="user"
                  className="rounded-circle"
                />{" "}
                <span className="profile-status away pull-right"></span>{" "}
              </span>{" "}
              <span className="mail-contnet">
                <h5 className="message-title">Arijit Sinh</h5>
                <span className="mail-desc">I am a singer!</span>{" "}
                <span className="time">9:08 AM</span>{" "}
              </span>{" "}
            </a>

            <a href="javascript:void(0)" className="message-item">
              {" "}
              <span className="user-img">
                {" "}
                <img
                  width="40px"
                  src="https://sharepointdevsolutions.sharepoint.com/sites/MigrationData/SiteAssets/images/1.jpg"
                  alt="user"
                  className="rounded-circle"
                />{" "}
                <span className="profile-status offline pull-right"></span>{" "}
              </span>{" "}
              <span className="mail-contnet">
                <h5 className="message-title">Pavan kumar</h5>
                <span className="mail-desc">Just see the my admin!</span>{" "}
                <span className="time">9:02 AM</span>{" "}
              </span>{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Notification;
