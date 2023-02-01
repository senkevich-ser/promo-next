import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>,HTMLParagraphElement> {
    size?:'s'|'l'|'m';
    children:ReactNode;
}