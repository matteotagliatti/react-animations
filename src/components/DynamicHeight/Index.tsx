import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function Example() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();

        setHeight(rect.height);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="wrapper">
      <button className="button" onClick={() => setShowExtraContent((b) => !b)}>
        Toggle height
      </button>
      <motion.div animate={{ height }} className="element">
        <div ref={elementRef} className="inner">
          <h1>Fake Family Drawer</h1>
          <p>
            This is a fake family drawer. Animating height is tricky, but
            satisfying when it works.
          </p>
          {showExtraContent ? (
            <p>
              This extra content will change the height of the drawer. Some even
              more content to make the drawer taller and taller and taller...
            </p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
