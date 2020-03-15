import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SixthWebpartWebPartStrings';
import SixthWebpart from './components/SixthWebpart';
import { ISixthWebpartProps } from './components/ISixthWebpartProps';

export interface ISixthWebpartWebPartProps {
  description: string;
}

export default class SixthWebpartWebPart extends BaseClientSideWebPart<ISixthWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISixthWebpartProps > = React.createElement(
      SixthWebpart,
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
