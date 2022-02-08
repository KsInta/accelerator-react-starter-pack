import {useState} from 'react';

type TabsProps = {
  vendorCode: string,
  type: string | undefined,
  stringCount: string,
  description: string,
}

const tabs = {
  char: 'characteristics',
  desc: 'description',
};

function ProductTabs({vendorCode, type, stringCount, description}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(tabs.char);

  let characteristicsVisible = 'hidden';
  let descriptionVisible = 'hidden';
  let activeCharacteristicsTabCn = 'button--black-border';
  let activeDescriptionTabCn = 'button--black-border';
  if (activeTab === tabs.char) {
    characteristicsVisible = '';
    activeCharacteristicsTabCn = '';
  }
  if (activeTab === tabs.desc) {
    descriptionVisible = '';
    activeDescriptionTabCn = '';
  }

  const handleCharacteristicsClick = () => {
    setActiveTab(tabs.char);
  };

  const handleDescriptionClick = () => {
    setActiveTab(tabs.desc);
  };

  return(
    <div className="tabs">
      <a className={`button button--medium tabs__button ${activeCharacteristicsTabCn}`} onClick={handleCharacteristicsClick}>Характеристики</a>
      <a className={`button button--medium tabs__button ${activeDescriptionTabCn}`} onClick={handleDescriptionClick}>Описание</a>
      <div className="tabs__content" id={activeTab}>
        <table className={`tabs__table ${characteristicsVisible}`}>
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{vendorCode}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">{type}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{stringCount} струнная</td>
            </tr>
          </tbody>
        </table>
        <p className={`tabs__product-description ${descriptionVisible}`}>{description}</p>
      </div>
    </div>
  );
}

export default ProductTabs;
