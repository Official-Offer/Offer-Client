import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const MarkDown = styled(ReactMarkdown)`
  h1 {
    font-family: "Circular Std";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #223052;
  }
  h2 {
    font-family: "Circular Std";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: #223052;
  }
  h3 {
    font-family: "Circular Std";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    color: #223052;
  }
  h4 {
    font-family: "Circular Std";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    color: #223052;
  }
  p {
    font-weight: 450;
    font-family: "Circular Std";
    font-size: 16px;
    color: #223052;
  }
  b {
    font-weight: bold;
    font-family: "Circular Std";
    color: rgba(34, 48, 82, 0.65);
  }
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
