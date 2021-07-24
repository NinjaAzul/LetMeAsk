import { ReactNode } from "react";
import "./questionStyles.scss";
import cx from "classnames";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode,
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({ content, author, isAnswered = false, isHighlighted = false, children }: QuestionProps) {
 // yarn add className Libfor className REACT
  return (
    <div className={
      cx(
        "question",
        {answered: isAnswered},
        {highlighted: isHighlighted && !isAnswered},
      )}
      >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <cite className="user-info-span"
            style={{
              display: "flex",
              alignItems: "center"
            }}>
            <img style={{ marginRight: "5px" }}
              src={author.avatar} alt={author.name} />
            {author.name}
          </cite>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}