import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

const logo_src = 'img/mrmxf-icon-circle.svg'

export default class MainMenu extends Component {
    render() {
        return (
            <Menu pointing>
                <Menu.Item
                    name='logo'
                    active={this.props.activeItem === 'logo'}
                ><img  src={logo_src}  alt="Mr MXF"/></Menu.Item>
                <Menu.Item
                    name='fig1-table'
                    active={this.props.activeItem === 'fig1'}
                >figure-1</Menu.Item>
            </Menu>
        )
    }
}
