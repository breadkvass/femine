import Photo from '../../assets/images/nastya.png';
import Dots from '../../assets/images/dots.png';
import styles from './TextSection.module.css';

const TextSection = () => {
  return (
      <section className={styles.background}>
        <div className={styles.content}>
            <div className={styles.textContainer}>
                <p>Привет, сестра! Меня зовут Настя, и&nbsp;я&nbsp;очень рада видеть&nbsp;тебя&nbsp;здесь!</p>
                <p>
                    Я создала Феминь, чтобы&nbsp;мы могли чувствовать себя свободно, 
                    безопасно и&nbsp;легко. С&nbsp;нами не&nbsp;нужно притворяться или&nbsp;подстраиваться: 
                    ты&nbsp;можешь быть собой —&nbsp;без&nbsp;страха, осуждения и&nbsp;ограничений.
                </p>
                <p>  
                    У нас тепло, уютно и&nbsp;по-настоящему. Мы&nbsp;поддерживаем друг друга, делимся историями (&nbsp;и&nbsp;смешными, и&nbsp;сложными),
                    вдохновляемся и&nbsp;просто отдыхаем от&nbsp;тревожного мира. Среди нас самые разные женщины: студентки, фрилансерки, 
                    офисные работницы, домохозяйки —&nbsp;всем здесь рады. Кому-то&nbsp;18, а&nbsp;кому-то&nbsp;44, но&nbsp;возраст, профессия 
                    и&nbsp;образ жизни не&nbsp;имеют значения. Главное&nbsp;—&nbsp;это взаимное уважение и&nbsp;желание быть в&nbsp;кругу тех, кто&nbsp;тебя&nbsp;понимает.
                    Благодаря нашим общим ценностям, мы всегда находим общий язык!
                </p>
                <p>
                    Ты не одна. Здесь тебя услышат, поддержат и&nbsp;примут такой, какая ты&nbsp;есть.
                </p>
                <p>
                    Добро пожаловать в&nbsp;Феминь!&nbsp;✊
                </p>
                <p>С любовью и&nbsp;солидарностью,<br />Настя</p>
            </div>
            <img className={styles.photo} src={Photo} alt='Организаторка' loading='lazy'/>
            <img className={styles.dotsImg} src={Dots} loading='lazy'/>

        </div>
      </section>
  );
};

export default TextSection;