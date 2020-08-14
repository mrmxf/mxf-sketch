import React from 'react';
import { Grid, Card } from 'semantic-ui-react'

import Menu from './react-components/main menu'
import MxfSvg from './react-components/mxf-sketch'

import fig1 from '../src/examples/vc6-mxf-fig1.json'
import fig2 from '../src/examples/vc6-mxf-fig2.json'

const home_menu_content = (
  <Card
    image='img/mrmxf-icon-circle.svg'
    header='MXF-sketch'
    description='An SVG diagram generator for MXF files'
    centered={true}
  />
)

export default class App extends React.Component {
  state = {
    activeMenuItem: 'home',
    body_content: home_menu_content,
    filename: ''
  }

  constructor(props) {
    super(props)
    this.state.body_content = home_menu_content
  }

  /** Handle a click from the main menu component
   * we receive the event and the name property of the component
  */
  handleMenuClick = (e, { name }) => {
    switch (name) {
      default:
      case 'home':
        this.setState({
          activeMenuItem: name,
          body_content: (home_menu_content)
        })
        break
      case 'fig1':
        this.setState({
          activeMenuItem: name,
          body_content: (<MxfSvg sketch={fig1} />)
        })
        break;
      case 'fig2':
        this.setState({
          activeMenuItem: name,
          body_content: (<MxfSvg sketch={fig2} />)
        })
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <Grid columns={3} padded>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={10}>

              <Menu
                menuHandler={this.handleMenuClick}
                activeItem={this.state.activeMenuItem}
                config={this.state.config}
              />

            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={10}>

              {this.state.body_content}

            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
