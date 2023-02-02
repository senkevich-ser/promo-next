import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    size?:'s'|'l';
    color?:'green'|'ghost'|'primary'|'red'|'grey';
    children:ReactNode;
    href?:string;
}