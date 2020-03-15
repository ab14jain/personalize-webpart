import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FourthWebpartWebPartStrings';
import FourthWebpart from './components/FourthWebpart';
import { IFourthWebpartProps } from './components/IFourthWebpartProps';

export interface IFourthWebpartWebPartProps {
  description: string;
}

export default class FourthWebpartWebPart extends BaseClientSideWebPart<IFourthWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFourthWebpartProps > = React.createElement(
      FourthWebpart,
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
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
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
