import styles from './empty-list.module.css';

function EmptyList(): JSX.Element {
  return (
    <div className={styles.container}>
      <h2>По вашему запросу гитар не найдено</h2>
      <p>Попробуйте поменять параметры поиска</p>
    </div>
  );
}

export default EmptyList;
