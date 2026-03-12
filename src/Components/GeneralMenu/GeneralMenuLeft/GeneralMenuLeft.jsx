import { useState, useMemo } from "react";
import { SvgIcon } from "../GeneralMenu/SvgIcon";
import { PngIcon } from "../GeneralMenu/PngIcon";
import styles from "../GeneralMenu/generalmenu.module.css";

export const GeneralMenuLeft = ({ sections }) => {

  const [search, setSearch] = useState("");

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;

    return sections.map((section) => {
        const filteredItems = section.items.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );

        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);

  }, [search, sections]);

  return (
    <div className={styles.MenuLeftBox}>
      <div className={styles.searchbox}>
        <SvgIcon name="search" color="#606770" size={16} />
        <input
          type="text"
          placeholder="Search menu"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.LeftBoxAllSection}>
        {filteredSections.length === 0 && (
          <p style={{ padding: "20px", textAlign: "center", color: "#65676b" }}>
            No results found
          </p>
        )}

        {filteredSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.LeftBoxSection}>
            <h3>{section.title}</h3>

            {section.items.map((item, index) => (
              <div className={styles.MenuLeftBoxRow} key={index}>
                <PngIcon name={item.icon} />
                <div className={styles.TitleSubtitleholder}>
                  <h4>{item.title}</h4>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            ))}

            {sectionIndex !== filteredSections.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
};