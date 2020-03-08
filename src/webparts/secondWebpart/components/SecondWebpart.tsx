import * as React from 'react';
import styles from './SecondWebpart.module.scss';
import { ISecondWebpartProps } from './ISecondWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ClientsidePageFromFile } from '@pnp/sp/clientside-pages';
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";

export interface ISecondWebpartState{
  selectedWebpart: string;
}

export default class SecondWebpart extends React.Component<ISecondWebpartProps, ISecondWebpartState> {

  constructor(props){
    super(props);
    this.state = {
      selectedWebpart: "Second Webpart"
    }
  }

  public render(): React.ReactElement<ISecondWebpartProps> {
    return (
      <div className={ styles.secondWebpart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a className={ styles.button } onClick={this._removeSelectedWebpart.bind(this)}>
                <span className={ styles.label }>Remove</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private async _removeSelectedWebpart(){
    this._removeWebpart().then(res => {
      console.log(res);
      window.location.reload(false);
    });
  }

  private async _removeWebpart(){
    //const page = await ClientsidePageFromFile(sp.web.getFileByServerRelativePath("/sites/MigrationData/SitePages/Index.aspx"));

    //console.log(this.props.context.pageContext.site.serverRequestPath);
    //console.log(this.props.context.site.absoluteUrl);

    let pageURL = "/sites/MigrationData/SitePages/Home.aspx";
    //let pageURL = this.context.pageContext.site.serverRequestPath + "/SitePages/Home.aspx";
    const file = sp.web. getFileByServerRelativePath(pageURL); //this.context.pageContext.site.serverRequestPath);
    const page = await ClientsidePageFromFile(file);

    page.sections.forEach(section => {
      section.columns.forEach(column => {
        column.controls.forEach(control => {
          let wpTitle = control.data.webPartData.title;
          if(this.state.selectedWebpart == wpTitle){
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
