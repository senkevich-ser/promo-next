import styles from "./TopPageComponent.module.css";
import { TopPageComponentProps } from "./TopPageComponent.props";

export const TopPageComponent = ({
  firstCategory,
  page,
  products,
}: TopPageComponentProps): JSX.Element => {
  return (
    <>
      <ul>{products && products.map((p) => <li key={p._id}>{p.title}</li>)}</ul>
    </>
  );
};
