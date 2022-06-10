import styled from 'styled-components';
import ReactMarkdown from "react-markdown";

export const MarkDown = styled(ReactMarkdown)`
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 1.2rem;
  }
  p {
    // font-weight: bold;
    // font-weight: 400;
    font-size: 0.9rem;
  }
  img {
    // padding: 20px;
    width: 100%;
    margin: auto;
    border-radius: 20px;
    display: block;
  }
  pre {
    color: #ccc;
    background: #2d2d2d;
    font-size: 0.8em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
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
    //font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 0.8em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
`;

//    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;

