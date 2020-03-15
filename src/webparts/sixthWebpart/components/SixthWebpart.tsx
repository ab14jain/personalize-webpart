import * as React from 'react';
import styles from './SixthWebpart.module.scss';
import { ISixthWebpartProps } from './ISixthWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ClientsidePageFromFile } from "@pnp/sp/clientside-pages";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items/list";
import "@pnp/sp/clientside-pages/web";
import News from './News/News';

export interface ISixthWebpartState {
  selectedWebpart: string;
  showTiles: string[];
  webparts: string[];
  allSubscribedWebpart: string[];
  webpartSelection: string;
}

export default class SixthWebpart extends React.Component<ISixthWebpartProps, ISixthWebpartState> {
  constructor(props) {
    super(props);
    let webparts = []; //["Task", "News", "Chart", "Notification", "Report"];
    this.state = {
      selectedWebpart: "Sixth Webpart",
      allSubscribedWebpart: [],
      webparts: [],
      showTiles: webparts,
      webpartSelection: ""
    };
  }

  handleIconClick(slectedWebpart: string) {
    console.log("handleIconClick in sixth Webpart");
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

  public render(): React.ReactElement<ISixthWebpartProps> {
    return (
      <div className={ styles.sixthWebpart }>
        <div className={ styles.container }>
          <News removeTile={this.handleIconClick.bind(this)}></News>
        </div>
      </div>
    );
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

  private async _removeSelectedWebpart() {
    this._removeWebpart().then(res => {
      window.location.reload(false);
      console.log(res);
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

    if(updatedWebpartDetail.length == 1 && index == 0){
      updatedWebpartDetail = []
    }
    else{
      updatedWebpartDetail.splice(index, 1);
    }

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
