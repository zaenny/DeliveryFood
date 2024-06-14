import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";
import Error from "./Error"

// config 재생성을 막는 방법
const requestConfig = {};

export default function Meals(){
    // -- useHttp Hook before -- 
    // const [loadedMeals, setLoadedMeals] = useState([]);
    // useEffect(() => {

    //     async function fetchMeals(){
    
    //         const response = await fetch('http://localhost:3000/meals');
    //         if(!response.ok){
    //             //..
    //         }
    
    //         const meals = await response.json();
    //         setLoadedMeals(meals);
    //     }

    //     fetchMeals();

    // },[]);

    const { 
        data : loadedMeals
        , isLoading
        , error 
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if(isLoading){
        return (<p className="center">Fetching meals...</p>);
    }

    if(error){
        return <Error title="Failed to fetch meals" message={error} />;
    }
 
    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}