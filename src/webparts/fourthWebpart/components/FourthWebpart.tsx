import * as React from "react";
import styles from "./FourthWebpart.module.scss";
import { IFourthWebpartProps } from "./IFourthWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { ClientsidePageFromFile } from "@pnp/sp/clientside-pages";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import Task from "./Task/Task";

import "./../../../common/css/style.css";
import "./../../../common/css/default.css";

export interface IFourthWebpartState {
  selectedWebpart: string;
}

export default class FourthWebpart extends React.Component<
  IFourthWebpartProps,
  IFourthWebpartState
> {
  constructor(props) {
    super(props);
    this.state = {
      selectedWebpart: "Fourth Webpart"
    };
  }

  handleIconClick(slectedWebpart: string) {
    console.log("handleIconClick in Fourth Webpart");
    console.log(slectedWebpart);
    // let allTiles = this.state.showTiles;
    // let index = allTiles.indexOf(slectedWebpart);
    // //delete allTiles[index];
    // allTiles.splice(index, 1);
    // this.setState({
    //   showTiles: allTiles
    // });
    this._removeSelectedWebpart();
  }

  public render(): React.ReactElement<IFourthWebpartProps> {
    return (
      <div className={styles.fourthWebpart}>
        <div className={styles.container}>
          <Task removeTile={this.handleIconClick.bind(this)}></Task>
          {/* <div className={styles.row}>
            <div className={styles.webpartOption} style={{ height: "5px" }}>
              <Icon
                iconName="Delete"
                className={styles.deleteWebpart}
                style={{ fontSize: "16px", float: "right", cursor: "pointer" }}
                onClick={this._removeSelectedWebpart.bind(this)}
              ></Icon>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className={styles.description}>
                {escape(this.props.description)}
              </p>
              <a
                className={styles.button}
                onClick={this._removeSelectedWebpart.bind(this)}
              >
                <span className={styles.label}>Remove</span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    );
  }

  private async _removeSelectedWebpart() {
    this._removeWebpart().then(res => {
      window.location.reload(false);
      console.log(res);
    });
  }

  private async _removeWebpart() {
    //const page = await ClientsidePageFromFile(sp.web.getFileByServerRelativePath("/sites/MigrationData/SitePages/Index.aspx"));

    //let pageURL = "/sites/MigrationData/SitePages/Index.aspx";
    let pageURL = "/sites/MigrationData/SitePages/Home.aspx";
    //let pageURL = this.context.pageContext.site.serverRequestPath + "/SitePages/Home.aspx";
    const file = sp.web.getFileByServerRelativePath(pageURL); //this.context.pageContext.site.serverRequestPath);
    const page = await ClientsidePageFromFile(file);

    page.sections.forEach(section => {
      section.columns.forEach(column => {
        column.controls.forEach(control => {
          let wpTitle = control.data.webPartData.title;
          if (this.state.selectedWebpart == wpTitle) {
            control.remove();
          }
        });
      });
    });
    console.log("Removed");
    await page.save();
    alert("Remove");
  }
}
