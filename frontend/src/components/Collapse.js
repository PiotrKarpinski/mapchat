import React from "react";

export default class Collapse extends React.Component {

    static defaultProps = {
        vertical: false,
        elementMaxLength: '300px',
        onOpen: () => console.log('Opened'),
        onClose: () => console.log('Closed'),
    }

    constructor(props) {
        super(props);

        this.state = {
            cssTarget: '_collapseH'
        }
    }

    componentDidMount() {
        if (this.props.vertical)
            this.setState({cssTarget: '_collapseV'})

        if (this.props.isOpen)
            this.collapse();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen)
            this.collapse();
    }

    collapse() {
        let content = this.refs.collapseDiv;
        if (content)
            if (this.decide(content))
                this.close(content)
            else
                this.open(content)
    }

    decide(content) {
        if (this.props.vertical)
            return content.style.maxHeight;

        return content.style.maxWidth;
    }

    open(content) {
        this.assign(content, this.props.elementMaxLength, 1);
        this.props.onOpen();
    }

    close(content) {
        this.assign(content, null, 0)
        this.props.onClose();
    }

    assign(content, value, opacity) {
        if (this.props.vertical) {
            content.style.maxHeight = value;
            content.style.opacity = opacity;

        }

        else {
            content.style.maxWidth = value;
            content.style.opacity = opacity;
        }

    }

    render() {
        return (
            <div style={this.props.style} ref='collapseDiv' target={this.state.cssTarget}>
                {this.props.children}
            </div>
        );
    }
}