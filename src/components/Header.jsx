import Button from './UI/Button';
import logoImg from '../assets/logo.jpg'
import { useContext } from 'react';
import CartContext from '../store/CartContext';

export default function Header(){
    
    const cartCtx = useContext(CartContext);
    // 내장 reduce메소드는 배열을 하나의 값으로 줄여주는데 즉 숫자 하나로 줄여줄수있다.
    const totalCartItems = cartCtx.items.reduce(() => {}, 0);

    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg}/>
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly>Cart (0)</Button>
            </nav>
        </header>
    );
}