import React, { Component } from 'react'
import { Card, Button, Message } from 'semantic-ui-react'

import FileStructure from '../react-components/mxf-sketch-file-structure'
import default_theme from '../themes/default/default-theme..json'
import download_helper from '../lib/lib-mm-downlod-helper'

async function load_theme(theme_name) {
    import(`../themes/${theme_name}/${theme_name}-theme.json`)
        .then(obj => this.theme = obj)
        .catch(() => null)
}

export default class MxfSketch extends Component {
    state = {
        theme: default_theme
    }

    constructor(props) {
        super(props)
        this.setState({ theme: default_theme })
        this.svg_string = ""
    }

    download_svg= (e) => {
        download_helper(this.svg_string, 'svg', e.target.innerText)
    }

    handle_svg_update = (svg) => {
        this.svg_string = svg
    }

    render() {
        const { sketch } = this.props
        if (this.props.theme)
            this.theme = load_theme()
        if (this.props.sketch && this.props.sketch.configuration && this.props.sketch.configuration.theme)
            this.theme = load_theme(this.props.sketch.configuration.theme)

        let body

        let figure_components

        let caption
        if (sketch.caption)
            caption = <Card.Header>{caption}</Card.Header>

        switch (sketch.configuration.type) {
            case "file-structure":
                figure_components = <FileStructure sketch={sketch} theme={this.state.theme} update_svg={this.handle_svg_update} />
                break
            default:
                figure_components = false
        }

        if (figure_components) {
            body = (<Card fluid>
                {caption}
                <Card.Meta>{sketch.caption}</Card.Meta>
                <Card.Content >
                    {figure_components}
                </Card.Content>
                <Card.Content
                    extra={true}
                >
                    <Button basic icon='download' content={sketch.configuration.default_filename} onClick={this.download_svg} />
                </Card.Content>
            </Card>
            )
        }
        else {
            body = <Message negative header='Unknown MXF-sketch type' content={`type=${sketch.configuration.type}`} />
        }

        return (body)
    }
}