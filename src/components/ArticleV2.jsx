import React from 'react';
import Article from './Article';
const Page = () => {
    return (
        <div>
            <Article
                title="Viena pirmųjų Vokietijos brigados šeimų Lietuvoje: pirmasis įspūdis – čia labai ramu"
                imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR98_PWYgxgSyYxbPnzgBaEZ9NHbU7j5Tce6w&s"
            />

            <Article
                title="Keliautoja aplankė 20 šalių: miestai, į kuriuos negrįžčiau, ir kur keliaučiau vėl"
                imgUrl="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg"
            />
        </div>
    );
};

export default Page;