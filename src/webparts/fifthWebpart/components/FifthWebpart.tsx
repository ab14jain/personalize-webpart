import * as React from "react";
import styles from "./FifthWebpart.module.scss";
import { IFifthWebpartProps } from "./IFifthWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Notification from "./Notification/Notification";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsidePageFromFile } from "@pnp/sp/clientside-pages";

import "./../../../common/css/style.css";
import "./../../../common/css/default.css";

export interface IFifthWebpartState {
  selectedWebpart: string;
}

export default class FifthWebpart extends React.Component<
  IFifthWebpartProps,
  IFifthWebpartState
> {
  handleIconClick(slectedWebpart: string) {
    console.log("handleIconClick in Third Webpart");
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

  public render(): React.ReactElement<IFifthWebpartProps> {
    return (
      <div className={styles.fifthWebpart}>
        <div className={styles.container}>
          <Notification
            removeTile={this.handleIconClick.bind(this)}
          ></Notification>
        </div>
      </div>
    );
  }
}
