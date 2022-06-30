import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const MarkDown = styled(ReactMarkdown)`
  img {
    width: 100%;
    margin: 20px auto;
    display: block;
  }
  pre {
    color: #ccc;
    background: #2d2d2d;
    color: rgba(34, 48, 82, 0.65);
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 2;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    padding: 1em;
    margin: 35px 0;
    overflow: auto;
  }
  u {
    text-decoration: 'underline';
    font-weight: bold;
  }
  * {
    font-family: Circular Std Light;
    font-style: Light;
    font-weight: light;
    color: #223052;
  }
  code {
    color: #ccc;
    background: none;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 2;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  a {
    font-weight: bold;
    color: #058499;
  }
`;

//    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
