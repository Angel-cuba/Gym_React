import React from "react";
import { useTranslation } from "react-i18next";
import { languages, LanguageCode } from "../../i18n";

const LanguageSwitcher = (): JSX.Element => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language as LanguageCode;

  return (
    <div className="language-switcher" aria-label={t("language.label") ?? undefined}>
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          className={currentLanguage === language.code ? "active" : ""}
          aria-pressed={currentLanguage === language.code}
          title={language.name}
          onClick={() => i18n.changeLanguage(language.code)}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
