import React from "react";
import styled from "styled-components";

const Gird = (props) => {
    const {is_flex, width, padding,margin, bg, children} = props

    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg
    }
    return (
        <>
        <GridBox {...styles}>{children}</GridBox>
        </>
    )
}

Gird.defaultProps = {
    children:  null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
}

const GridBox = styled.div`
    width: ${(props) => props.width}
    height: 100%;
    box-sizing: border-box;      //padding or border 도 넓이에 포함시킨다!
    ${(props) => props.padding? `padding: ${props.padding}` : ""}
    ${(props) => props.margin? `margin: ${props.margin}` : ""}
    ${(props) => props.bg? `background-color: ${props.bg}` : ""}
    ${(props) => props.is_flex? `display: flex; align-items: center; justify-content: space-between;`:  ""}
`

export default Gird;