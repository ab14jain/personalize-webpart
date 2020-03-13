import * as React from "react";
import styles from "./ThirdWebpart.module.scss";
import { IThirdWebpartProps } from "./IThirdWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { ClientsidePageFromFile } from "@pnp/sp/clientside-pages";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import Report from "./Report/Report";
import "./../../../common/css/style.css";
import "./../../../common/css/default.css";

export interface IThirdWebpartState {
  selectedWebpart: string;
}

export default class ThirdWebpart extends React.Component<
  IThirdWebpartProps,
  IThirdWebpartState
> {
  constructor(props) {
    super(props);
    this.state = {
      selectedWebpart: "Third Webpart"
    };
  }

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

  public render(): React.ReactElement<IThirdWebpartProps> {
    return (
      <div className={styles.thirdWebpart}>
        <div className={styles.container}>
          <Report removeTile={this.handleIconClick.bind(this)}></Report>
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
