import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

const logo_src = 'img/mrmxf-icon-circle.svg'

export default class MainMenu extends Component {
    render() {
        return (
            <Menu pointing>
                <Menu.Item
                    name='home'
                    active={this.props.activeItem === 'home'}
                    onClick={this.props.menuHandler}
                ><img src={logo_src} alt="Mr MXF" /></Menu.Item>
                <Menu.Item
                    name='fig1'
                    active={this.props.activeItem === 'fig1'}
                    onClick={this.props.menuHandler}
                >figure-1</Menu.Item>
                <Menu.Item
                    name='fig2'
                    active={this.props.activeItem === 'fig2'}
                    onClick={this.props.menuHandler}
                >figure-2</Menu.Item>
            </Menu>
        )
    }
}
