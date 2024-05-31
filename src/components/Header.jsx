import Button from './UI/Button';
import logoImg from '../assets/logo.jpg'
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header(){
    
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    // 내장 reduce메소드는 배열을 하나의 값으로 줄여주는데 즉 숫자 하나로 줄여줄수있다.
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity 
    }, 0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg}/>
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart} >Cart ({totalCartItems})</Button>
            </nav>
        </header>
    ); 
}