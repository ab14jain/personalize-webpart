import * as React from "react";
import styles from "./SecondWebpart.module.scss";
import { ISecondWebpartProps } from "./ISecondWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { ClientsidePageFromFile } from "@pnp/sp/clientside-pages";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import Chart from "./Chart/Chart";
import "./../../../common/css/style.css";
import "./../../../common/css/default.css";

export interface ISecondWebpartState {
  selectedWebpart: string;
  showTiles: string[];
  webparts: string[];
  allSubscribedWebpart: string[];
  webpartSelection: string;
}

export default class SecondWebpart extends React.Component<
  ISecondWebpartProps,
  ISecondWebpartState
> {
  constructor(props) {
    super(props);
    let webparts = []; //["Task", "News", "Chart", "Notification", "Report"];
    //this.props.webparts = webparts;
    this.state = {
      selectedWebpart: "Second Webpart",
      allSubscribedWebpart: [],
      webparts: [],
      showTiles: webparts,
      webpartSelection: ""
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

  componentDidMount() {
    this._getSelectedWebpart();
  }

  public render(): React.ReactElement<ISecondWebpartProps> {
    return (
      <div className={styles.secondWebpart}>
        <div className={styles.container}>
          <Chart removeTile={this.handleIconClick.bind(this)}></Chart>
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

  private _removeSelectedWebpart() {
    this._removeWebpart().then(res => {
      console.log(res);
      window.location.reload(false);
    });
  }

  private _getSelectedWebpart() {
    sp.web.lists
      .getByTitle("EmployeeWebpartDetail")
      .items.select("*", "DashboardUser/EMail")
      .expand("DashboardUser")
      .filter(
        `DashboardUser/EMail eq '${this.props.context.pageContext.user.email}'`
      )
      .getAll()
      .then(res => {
        console.log("===============================================");
        console.log(res);
        this.setState({
          allSubscribedWebpart: res[0].OOTBWebpartName
        });
        console.log("===============================================");
      });
  }

  private async _removeWebpart() {
    //const page = await ClientsidePageFromFile(sp.web.getFileByServerRelativePath("/sites/MigrationData/SitePages/Index.aspx"));

    //console.log(this.props.context.pageContext.site.serverRequestPath);
    //console.log(this.props.context.site.absoluteUrl);

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

    let updatedWebpartDetail = this.state.allSubscribedWebpart;

    let index = this.state.allSubscribedWebpart.indexOf(
      this.state.selectedWebpart
    );
    updatedWebpartDetail = updatedWebpartDetail.splice(index, 1);

    sp.web.lists
      .getByTitle("EmployeeWebpartDetail")
      .items.select("*", "DashboardUser/EMail")
      .expand("DashboardUser")
      .filter(
        `DashboardUser/EMail eq '${this.props.context.pageContext.user.email}'`
      )
      .getAll()
      .then(items => {
        if (items.length > 0) {
          sp.web.lists
            .getByTitle("EmployeeWebpartDetail")
            .items.getById(items[0].Id)
            .update({
              OOTBWebpartName: { results: updatedWebpartDetail }
            })
            .then(result => {
              // here you will have updated the item
              console.log(JSON.stringify(result));
              alert("Dashboard Saved!");
            });
        }
      });
    console.log("Removed");
    await page.save();
    alert("Remove");
  }
}
