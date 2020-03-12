import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "SecondWebpartWebPartStrings";
import SecondWebpart from "./components/SecondWebpart";
import { ISecondWebpartProps } from "./components/ISecondWebpartProps";

export interface ISecondWebpartWebPartProps {
  description: string;
}

export default class SecondWebpartWebPart extends BaseClientSideWebPart<
  ISecondWebpartWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<ISecondWebpartProps> = React.createElement(
      SecondWebpart,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
