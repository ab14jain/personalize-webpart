import * as React from "react";
import styles from "./FirstWebpart.module.scss";
import { IFirstWebpartProps } from "./IFirstWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";

import {
  ClientsideWebpart,
  ClientsidePageFromFile,
  ClientsideText
} from "@pnp/sp/clientside-pages";

export interface IFirstWebpartState {
  selectedWebpart: string[];
}

export default class FirstWebpart extends React.Component<
  IFirstWebpartProps,
  IFirstWebpartState
> {
  constructor(props) {
    super(props);
    this.state = {
      selectedWebpart: []
    };
  }

  private _getCurrentUserWebpartDetail() {
    console.log("===============================================");
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
          selectedWebpart: res[0].OOTBWebpartName
        });
        console.log("===============================================");
      });
  }
  componentDidMount() {
    this._getCurrentUserWebpartDetail();
  }

  public render(): React.ReactElement<IFirstWebpartProps> {
    console.log("======================First============================");
    this._displayWebpart();
    console.log("======================Last============================");
    const availableWebpart = [
      // {
      //   name: "First Webpart",
      //   id: "{A43197B7-179B-4CF9-B027-0AB70D1795C7}"
      // },
      {
        name: "Second Webpart",
        id: "{2881C2C7-F1BC-4C9E-89CA-FD3C47A4FEFF}"
      },
      {
        name: "Third Webpart",
        id: "{83663D30-85BC-4723-A04B-9C235F8BFB43}"
      },
      {
        name: "Fourth Webpart",
        id: "{977DA086-AE96-495F-8D8A-CFC33FBCED59}"
      }
    ];

    let ddWebpart = availableWebpart.map(item => {
      return <option value={item.id}>{item.name}</option>;
    });

    let chkboxWebpart = availableWebpart.map(item => {
      return (
        <div>
          <input
            type="checkbox"
            name={item.name}
            style={{ opacity: "1", position: "initial", pointerEvents: "auto" }}
            onChange={this._onChange.bind(this)}
          />
          <label>{item.name}</label>
        </div>
      );
    });

    return (
      <div className={styles.firstWebpart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>All webparts </span>
              <select>{ddWebpart}</select>
              {/* <br />
              <br />
              {chkboxWebpart} */}
              <p className={styles.description}>
                {escape(this.props.description)}
              </p>
              <a
                className={styles.button}
                onClick={this._AddWebpart.bind(this)}
              >
                <span className={styles.label}>Add</span>
              </a>
              <a
                className={styles.button}
                onClick={this._removeSelectedWebpart.bind(this)}
              >
                <span className={styles.label}>Remove</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _onChange(e) {
    let previousSelection = this.state.selectedWebpart;

    if (e.target.checked) {
      previousSelection.push(e.target.name);
    } else {
      var index = previousSelection.indexOf(e.target.name);

      delete previousSelection[index];
    }

    this.setState({
      selectedWebpart: previousSelection
    });
    //alert("_onChange===" + e.target.checked);
  }

  private async _displayWebpart() {
    // this will be a ClientSidePageComponent array
    // this can be cached on the client in production scenarios
    //alert(sp.web.allProperties);
    const partDefs = await sp.web.getClientsideWebParts();
    const page = await ClientsidePageFromFile(
      sp.web.getFileByServerRelativePath(
        "/sites/MigrationData/SitePages/Home.aspx"
      )
    );

    page.sections[0].columns.length = 0;
    page.sections[1].columns.length = 0;

    // create a new column layout
    page.sections[0].addColumn(6);
    page.sections[0].addColumn(6);
    page.sections[1].addColumn(6);
    page.sections[1].addColumn(6);

    // publish our changes
    await page.save();

    let part;
    this.state.selectedWebpart.forEach(element => {
      const partDef = partDefs.filter(c => c.Name === element);

      // optionally ensure you found the def
      if (partDef.length < 1) {
        // we didn't find it so we throw an error
        throw new Error("Could not find the web part");
      }

      // create a ClientWebPart instance from the definition
      part = ClientsideWebpart.fromComponentDef(partDef[0]);

      if (element == "First Webpart") {
        page.sections[0].columns[0].addControl(part);
      } else if (element == "Second Webpart") {
        page.sections[0].columns[1].addControl(part);
      } else if (element == "Third Webpart") {
        page.sections[1].columns[0].addControl(part);
      } else if (element == "Fourth Webpart") {
        page.sections[1].columns[1].addControl(part);
      }
    });

    await page.save();
  }

  private _AddWebpart() {
    this._getClientSideWebpart().then(res => {
      window.location.reload(false);
      console.log(res);
    });
    //alert("Add");
  }

  private async _removeSelectedWebpart() {
    this._removeWebpart().then(res => {
      //window.location.reload(false);
      console.log(res);
    });
  }

  private async _removeWebpart() {
    const page = await ClientsidePageFromFile(
      sp.web.getFileByServerRelativePath(
        "/sites/MigrationData/SitePages/Home.aspx"
      )
    );

    page.sections.forEach(section => {
      section.columns.forEach(column => {
        column.controls.forEach(control => {
          let wpTitle = control.data.webPartData.title;
          this.state.selectedWebpart.forEach(element => {
            if (wpTitle == element) {
              control.remove();
            }
            // console.log(page.sections)
            // const control1 = page.findControlById("1880db1e-0972-49cd-96f2-c64cba511757");
            // you can also type the control
            // debugger;
            // const control = page.findControlById<ClientsideText>("1880db1e-0972-49cd-96f2-c64cba511757");
            // console.log(control);
          });
        });
      });
    });

    await page.save();
    alert("Remove");
  }

  private async _getClientSideWebpart() {
    // this will be a ClientSidePageComponent array
    // this can be cached on the client in production scenarios
    //alert(sp.web.allProperties);
    console.log(sp.web.allProperties);
    const partDefs = await sp.web.getClientsideWebParts();
    console.log("==============Available webparts Start==============");
    console.log(partDefs);
    console.log("==============Available webparts End==============");
    const page = await ClientsidePageFromFile(
      sp.web.getFileByServerRelativePath(
        "/sites/MigrationData/SitePages/Home.aspx"
      )
    );

    let numberOfRows = page.sections.length;
    let numberOfControlsInRow = [];
    page.sections.forEach(section => {
      section.columns.forEach(column => {
        numberOfControlsInRow.push(column.controls.length);
      });
    });

    console.log(page.sections);
    console.log(numberOfRows);
    console.log(numberOfControlsInRow);

    let part;
    this.state.selectedWebpart.forEach(element => {
      //find the definition we want, here by id
      //const partDef = partDefs.filter(c => c.Id === "490d7c76-1824-45b2-9de3-676421c997fa");
      //const partDef = partDefs.filter(c => c.Id === "{977DA086-AE96-495F-8D8A-CFC33FBCED59}");
      //const partDef = partDefs.filter(c => c.Name === "DMS");

      const partDef = partDefs.filter(c => c.Name === element);

      // optionally ensure you found the def
      if (partDef.length < 1) {
        // we didn't find it so we throw an error
        throw new Error("Could not find the web part");
      }

      // create a ClientWebPart instance from the definition
      part = ClientsideWebpart.fromComponentDef(partDef[0]);

      // set the properties on the web part. Here for the embed web part we only have to supply an embedCode - in this case a youtube video.
      // the structure of the properties varies for each webpart and each version of a webpart, so you will need to ensure you are setting
      // the properties correctly
      // part.setProperties<{ embedCode: string }>({
      //     embedCode: "https://www.youtube.com/watch?v=IWQFZ7Lx-rg",
      // });

      // we add that part to a new section

      //page.addSection().addControl(part);

      for (let i = 0; i < numberOfControlsInRow.length; i++) {
        if (numberOfControlsInRow[i] == 0) {
          if (i == 0) {
            page.sections[0].columns[0].addControl(part);
            break;
          } else if (i == 1) {
            page.sections[0].columns[1].addControl(part);
            break;
          } else if (i == 2) {
            page.sections[1].columns[0].addControl(part);
            break;
          } else if (i == 3) {
            page.sections[1].columns[1].addControl(part);
            break;
          }
        }
      }
    });

    await page.save();
  }
}
