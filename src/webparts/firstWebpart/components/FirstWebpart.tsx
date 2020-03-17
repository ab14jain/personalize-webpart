import * as React from "react";
import styles from "./FirstWebpart.module.scss";
import { IFirstWebpartProps } from "./IFirstWebpartProps";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import {
  CommandBar,
  ICommandBarItemProps
} from "office-ui-fabric-react/lib/CommandBar";
import { IButtonProps } from "office-ui-fabric-react/lib/Button";
const overflowProps: IButtonProps = { ariaLabel: "More commands" };

import "./../../../common/css/style.css";
import "./../../../common/css/default.css";

import {
  ClientsideWebpart,
  ClientsidePageFromFile
} from "@pnp/sp/clientside-pages";
import {
  IContextualMenuProps,
  IContextualMenuItem,
  ContextualMenuItemType
} from "office-ui-fabric-react/lib/ContextualMenu";

export interface IFirstWebpartState {
  selectedWebpart: string;
  subscribedWebpart: string[];
}

export default class FirstWebpart extends React.Component<
  IFirstWebpartProps,
  IFirstWebpartState
> {
  constructor(props) {
    super(props);
    this.state = {
      selectedWebpart: "",
      subscribedWebpart: []
    };
  }

  private _getCurrentUserWebpartDetail() {
    console.log(
      "================== _getCurrentUserWebpartDetail ============================="
    );
    sp.web.lists
      .getByTitle("EmployeeWebpartDetail")
      .items.select("*", "DashboardUser/EMail")
      .expand("DashboardUser")
      .filter(
        `DashboardUser/EMail eq '${this.props.context.pageContext.user.email}'`
      )
      .getAll()
      .then(res => {
        console.log(
          "================_getCurrentUserWebpartDetail==============================="
        );
        console.log(res);
        this.setState({
          subscribedWebpart: res[0].OOTBWebpartName
        });
        this._displayWebpart();
        console.log(
          "=====================_getCurrentUserWebpartDetail=========================="
        );
      });
  }
  componentDidMount() {
    this._getCurrentUserWebpartDetail();
    let allButtons = document.getElementsByTagName("i");
    for (let i = 0; i < allButtons.length; i++) {
      let currChildItem = allButtons[i].getAttribute("data-icon-name");
      let currChildItemElement = allButtons[i] as HTMLElement;
      if (currChildItem == "Edit") {
        currChildItemElement.parentElement.parentElement.parentElement.style.display =
          "block";
      }

      if (currChildItem == "Save") {
        currChildItemElement.parentElement.parentElement.parentElement.style.display =
          "none";
      }

      if (currChildItem == "Add") {
        currChildItemElement.parentElement.parentElement.parentElement.style.display =
          "none";
      }

      if (currChildItem == "Delete") {
        currChildItemElement.style.display = "none";
      }
    }
  }

  public render(): React.ReactElement<IFirstWebpartProps> {
    //console.log("======================First============================");

    //console.log("======================Last============================");
    let allWebParts = ["Chart", "Report", "Task", "Notification", "News"];
    let allWebPartsToBeDiplayed = allWebParts;

    this.state.subscribedWebpart.forEach(webpartName => {
      let mappedWebPartName = "";
      switch (webpartName) {
        case "Second Webpart":
          mappedWebPartName = "Chart";
          break;
        case "Third Webpart":
          mappedWebPartName = "Report";
          break;
        case "Fourth Webpart":
          mappedWebPartName = "Task";
          break;
        case "Fifth Webpart":
          mappedWebPartName = "Notification";
          break;
        case "Sixth Webpart":
          mappedWebPartName = "News";
          break;
      }

      let webpartIndex = allWebParts.indexOf(mappedWebPartName);
      allWebPartsToBeDiplayed.splice(webpartIndex, 1);
    });

    let commandBarItems = [];
    allWebPartsToBeDiplayed.forEach(element => {
      let iconName = element;
      if (element == "Notification") {
        iconName = "Ringer";
      }

      if (element == "Report") {
        iconName = "ReportAdd";
      }

      if (element == "Task") {
        iconName = "TaskLogo";
      }

      commandBarItems.push({
        key: element,
        text: element,
        iconProps: { iconName: iconName },
        onClick: () => this.addWebpart(element)
      });
    });

    commandBarItems.push({
      key: "divider_1",
      itemType: ContextualMenuItemType.Divider
    });

    commandBarItems.push({
      key: "AllWebpart",
      text: "All Webpart",
      iconProps: { iconName: "AllApps" },
      onClick: () => this.addWebpart("All Webpart")
    });

    const _items: ICommandBarItemProps[] = [
      {
        key: "newItem",
        text: "Add Webpart",
        cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
        iconProps: { iconName: "Add" },
        subMenuProps: {
          items: commandBarItems
          //[
          //   {
          //     key: 'emailMessage',
          //     text: 'All Webparts',
          //     iconProps: { iconName: 'Mail' },
          //     ['data-automation-id']: 'newEmailButton' // optional
          //   },
          //   {
          //     key: 'calendarEvent',
          //     text: 'Calendar event',
          //     iconProps: { iconName: 'Calendar' }
          //   }
          // ]
        }
      }
    ];

    const _farItems: ICommandBarItemProps[] = [
      {
        key: "edit",
        text: "Edit",
        // This needs an ariaLabel since it's icon-only
        ariaLabel: "Edit",
        iconProps: { iconName: "Edit" },
        onClick: () => enableDeleteButton()
      },
      {
        key: "save",
        text: "Save",
        // This needs an ariaLabel since it's icon-only
        ariaLabel: "Save",
        iconProps: { iconName: "Save" },
        style: { display: "flex" },
        onClick: () => saveDashboard()
      }
    ];

    function saveDashboard() {
      console.log(document.getElementsByTagName("i"));
      let allButtons = document.getElementsByTagName("i");
      for (let i = 0; i < allButtons.length; i++) {
        //let children = allButtons[i];
        //for(let j = 0; j < children.length; j++){
        let currChildItem = allButtons[i].getAttribute("data-icon-name");
        let currChildItemElement = allButtons[i] as HTMLElement;
        if (currChildItem == "Edit") {
          currChildItemElement.parentElement.parentElement.parentElement.style.display =
            "block";
        }

        if (currChildItem == "Save") {
          currChildItemElement.parentElement.parentElement.parentElement.style.display =
            "none";
        }

        if (currChildItem == "Add") {
          currChildItemElement.parentElement.parentElement.parentElement.style.display =
            "none";
        }

        if (currChildItem == "Delete") {
          currChildItemElement.style.display = "none";
        }
        //}
      }
    }

    function enableDeleteButton() {
      console.log(document.getElementsByTagName("i"));
      let allButtons = document.getElementsByTagName("i");
      for (let i = 0; i < allButtons.length; i++) {
        //let children = allButtons[i];
        //for(let j = 0; j < children.length; j++){
        let currChildItem = allButtons[i].getAttribute("data-icon-name");
        let currChildItemElement = allButtons[i] as HTMLElement;
        if (currChildItem == "Delete") {
          if (currChildItemElement.style.display == "block") {
            currChildItemElement.style.display = "none";
          } else {
            currChildItemElement.style.display = "block";
          }
        }

        if (currChildItem == "Add") {
          currChildItemElement.parentElement.parentElement.parentElement.style.display =
            "block";
        }

        if (currChildItem == "Edit") {
          currChildItemElement.parentElement.parentElement.parentElement.style.display =
            "none";
        }

        if (currChildItem == "Save") {
          currChildItemElement.parentElement.parentElement.parentElement.style.display =
            "block";
        }
        //}
      }
    }

    // const availableWebpart = [
    //   // {
    //   //   name: "First Webpart",
    //   //   id: "{A43197B7-179B-4CF9-B027-0AB70D1795C7}"
    //   // },
    //   {
    //     name: "Second Webpart",
    //     id: "{2881C2C7-F1BC-4C9E-89CA-FD3C47A4FEFF}"
    //   },
    //   {
    //     name: "Third Webpart",
    //     id: "{83663D30-85BC-4723-A04B-9C235F8BFB43}"
    //   },
    //   {
    //     name: "Fourth Webpart",
    //     id: "{977DA086-AE96-495F-8D8A-CFC33FBCED59}"
    //   }
    // ];

    // let ddWebpart = availableWebpart.map(item => {
    //   return <option value={item.id}>{item.name}</option>;
    // });

    // let chkboxWebpart = availableWebpart.map(item => {
    //   return (
    //     <div>
    //       <input
    //         type="checkbox"
    //         name={item.name}
    //         style={{ opacity: "1", position: "initial", pointerEvents: "auto" }}
    //         onChange={this._onChange.bind(this)}
    //       />
    //       <label>{item.name}</label>
    //     </div>
    //   );
    // });

    return (
      <div className={styles.firstWebpart}>
        <div className={styles.container}>
          {/* <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>All webparts </span>
              <select>{ddWebpart}</select>
              <br />
              <br />
              {chkboxWebpart}
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
          </div> */}
          <CommandBar
            items={_items}
            overflowButtonProps={overflowProps}
            farItems={_farItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          ></CommandBar>
        </div>
      </div>
    );
  }

  private addWebpart(webpartName: string) {
    alert(webpartName);
    this._AddWebpart(webpartName);
  }

  // private _onChange(e) {
  //   let previousSelection = this.state.selectedWebpart;

  //   if (e.target.checked) {
  //     previousSelection.push(e.target.name);
  //   } else {
  //     var index = previousSelection.indexOf(e.target.name);

  //     delete previousSelection[index];
  //   }

  //   this.setState({
  //     selectedWebpart: previousSelection
  //   });
  //   //alert("_onChange===" + e.target.checked);
  // }

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

    page.sections[1].columns.length = 0;
    page.sections[2].columns.length = 0;
    page.sections[3].columns.length = 0;

    // create a new column layout
    page.sections[1].addColumn(6);
    page.sections[1].addColumn(6);
    page.sections[2].addColumn(6);
    page.sections[2].addColumn(6);
    page.sections[3].addColumn(6);
    page.sections[3].addColumn(6);
    // publish our changes
    await page.save();

    let part;
    if (
      this.state.subscribedWebpart &&
      this.state.subscribedWebpart.length > 0
    ) {
      this.state.subscribedWebpart.forEach(element => {
        const partDef = partDefs.filter(c => c.Name === element);

        // optionally ensure you found the def
        if (partDef.length < 1) {
          // we didn't find it so we throw an error
          throw new Error("Could not find the web part");
        }

        // create a ClientWebPart instance from the definition
        part = ClientsideWebpart.fromComponentDef(partDef[0]);

        if (element == "Second Webpart") {
          page.sections[1].columns[0].addControl(part);
        } else if (element == "Third Webpart") {
          page.sections[1].columns[1].addControl(part);
        } else if (element == "Fourth Webpart") {
          page.sections[2].columns[0].addControl(part);
        } else if (element == "Fifth Webpart") {
          page.sections[2].columns[1].addControl(part);
        } else if (element == "Sixth Webpart") {
          page.sections[3].columns[0].addControl(part);
        } else if (element == "Seventh Webpart") {
          page.sections[3].columns[1].addControl(part);
        }
      });
    }

    await page.save();
  }

  private _AddWebpart(webpartName) {
    this._getClientSideWebpart(webpartName).then(res => {
      window.location.reload(false);
      console.log(res);
    });
    //alert("Add");
  }

  // private async _removeSelectedWebpart() {
  //   this._removeWebpart().then(res => {
  //     //window.location.reload(false);
  //     console.log(res);
  //   });
  // }

  // private async _removeWebpart() {
  //   const page = await ClientsidePageFromFile(
  //     sp.web.getFileByServerRelativePath(
  //       "/sites/MigrationData/SitePages/Home.aspx"
  //     )
  //   );

  //   page.sections.forEach(section => {
  //     section.columns.forEach(column => {
  //       column.controls.forEach(control => {
  //         let wpTitle = control.data.webPartData.title;
  //         this.state.selectedWebpart.forEach(element => {
  //           if (wpTitle == element) {
  //             control.remove();
  //           }
  //           // console.log(page.sections)
  //           // const control1 = page.findControlById("1880db1e-0972-49cd-96f2-c64cba511757");
  //           // you can also type the control
  //           // debugger;
  //           // const control = page.findControlById<ClientsideText>("1880db1e-0972-49cd-96f2-c64cba511757");
  //           // console.log(control);
  //         });
  //       });
  //     });
  //   });

  //   await page.save();
  //   alert("Remove");
  // }

  private async _getClientSideWebpart(webpartName) {
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

    let webpartToBeAdded = "";

    switch (webpartName) {
      case "Chart":
        webpartToBeAdded = "Second Webpart";
        break;
      case "Report":
        webpartToBeAdded = "Third Webpart";
        break;
      case "Task":
        webpartToBeAdded = "Fourth Webpart";
        break;
      case "Notification":
        webpartToBeAdded = "Fifth Webpart";
        break;
      case "News":
        webpartToBeAdded = "Sixth Webpart";
        break;
    }

    let part;
    //this.state.selectedWebpart.forEach(element => {
    //find the definition we want, here by id
    //const partDef = partDefs.filter(c => c.Id === "490d7c76-1824-45b2-9de3-676421c997fa");
    //const partDef = partDefs.filter(c => c.Id === "{977DA086-AE96-495F-8D8A-CFC33FBCED59}");
    //const partDef = partDefs.filter(c => c.Name === "DMS");

    const partDef = partDefs.filter(c => c.Name === webpartToBeAdded);

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

    if (webpartToBeAdded == "Second Webpart") {
      page.sections[1].columns[0].addControl(part);
    } else if (webpartToBeAdded == "Third Webpart") {
      page.sections[1].columns[1].addControl(part);
    } else if (webpartToBeAdded == "Fourth Webpart") {
      page.sections[2].columns[0].addControl(part);
    } else if (webpartToBeAdded == "Fifth Webpart") {
      page.sections[2].columns[1].addControl(part);
    } else if (webpartToBeAdded == "Sixth Webpart") {
      page.sections[3].columns[0].addControl(part);
    } else if (webpartToBeAdded == "Seventh Webpart") {
      page.sections[3].columns[1].addControl(part);
    }

    // for (let i = 0; i < numberOfControlsInRow.length; i++) {
    //   if (numberOfControlsInRow[i] == 0) {
    //     if (i == 0) {
    //       page.sections[0].columns[0].addControl(part);
    //       break;
    //     } else if (i == 1) {
    //       page.sections[0].columns[1].addControl(part);
    //       break;
    //     } else if (i == 2) {
    //       page.sections[1].columns[0].addControl(part);
    //       break;
    //     } else if (i == 3) {
    //       page.sections[1].columns[1].addControl(part);
    //       break;
    //     } else if (i == 4) {
    //       page.sections[2].columns[0].addControl(part);
    //       break;
    //     } else if (i == 5) {
    //       page.sections[2].columns[1].addControl(part);
    //       break;
    //     }
    //   }
    // }
    //});

    let webpartNeedToBeUpdated = this.state.subscribedWebpart;

    if (webpartNeedToBeUpdated == null) {
      webpartNeedToBeUpdated = [webpartToBeAdded];
    } else if (
      webpartNeedToBeUpdated &&
      this.state.subscribedWebpart.indexOf(webpartToBeAdded) < 0
    ) {
      webpartNeedToBeUpdated.push(webpartToBeAdded);
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
              OOTBWebpartName: { results: webpartNeedToBeUpdated }
            })
            .then(result => {
              // here you will have updated the item
              console.log(JSON.stringify(result));
              //alert("Dashboard Saved!");
            });
        }
      });
    console.log("Added");
    await page.save();
    alert("Added");
  }
}
