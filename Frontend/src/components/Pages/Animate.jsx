import React from "react";
import styles from "../../bubble.module.css"; // Correct CSS module import

const Example = () => {
  return (
    <div className="grid h-52 place-content-center bg-black">
      <BubbleText />
    </div>
  );
};

const BubbleText = () => {
  return (
    <h2 className="text-center md:text-6xl text-3xl font-bold font-montserrat text-[#e382f9]">
      {"2024 Winter Collection is here".split(" ").map((child, idx) => (
        <span className={styles.hoverText} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default Example;
