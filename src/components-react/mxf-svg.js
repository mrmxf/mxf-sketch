import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

import partition from '../svg-code/file-structure/partition'
import partition_settings from '../svg-components/file-structure/partition.json'

export default class MxfSvg extends Component {
    extra = (
        <a href="downlaod">
            <Icon name='download' />
          st-xxx-figure-01.svg
        </a>
    )

    constructor(props) {

        super(props)
        partition_settings.name = "HPP"
        this.test = partition(partition_settings)
        this.svg = <svg width={this.test.w} height={this.test.h}>{this.test.svg}</svg>
        
    }


    render() {

        return (
            <div>
                <Card>
                    <Card.Header>Figure 1</Card.Header>
                    <Card.Meta>SMPTE ST xxxx:202x</Card.Meta>
                    <Card.Description>Single Essence Location Style</Card.Description>
                    <Card.Content id='fig-1-svg'>
                        {this.svg}
                    </Card.Content>
                </Card>
                <Card

                    image='img/mrmxf-icon-circle.svg'
                    header='Figure 1'
                    meta='SMPTE ST xxx'
                    description='Single Essence Location Style'
                    extra={this.extra}
                />
            </div>
        )
    }
}