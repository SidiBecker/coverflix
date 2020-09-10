import styled from 'styled-components';

const Button = styled.a`
    color: var(--white);
    border: 1px solid var(--white);
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s;
    margin: 0 5px;
    line-height: 16px;
    height: 50px;
    &:hover,
    &:focus {
        opacity: .5;
    }

    &[disabled] {
        opacity: .5;
        cursor: default;
    }

    &.primary {

        &[disabled]{
            background: var(--blackLighter);
        }

        background: var(--primary);
        border: none;
        color: var(--white);
    }
`;

export default Button;
