import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import Menu from './components-react/demo menu'
import MxfSvg from './components-react/mxf-svg'

export default class App extends Component {
  state = {
    activeMenuItem: 'fig1'
  }

  render() {
    return (
      <div className="App">
        <Grid columns={3} padded>
          <Grid.Row>
            <Grid.Column>

              <Menu
                menuHandler={this.handleMenuClick}
                activeItem={this.state.activeMenuItem}
                config={this.state.config}
              />
              {this.state.body_content}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>

              <MxfSvg />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
