import React, {useState,useEffect} from 'react';
import './App.css';
//import call from './react-native-phone-call';
import { db } from './fire';

const Hero = ({handleLogout})=> {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [telphone , setTel] = useState('');

   /* const triggerCall = (inputValue) => {
        // Check for perfect 10 digit length
        if (inputValue.length != 10) {
          alert('Please insert correct contact number');
          return;
        }
      
        const args = {
          number: inputValue,
          prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
      };
*/
    useEffect(()=> {
        const getPostsFromFirebase = [];
        const subscriber = db
        .collection("login")
        .onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                getPostsFromFirebase.push({
                    ...doc.data(),
                    Key: doc.id,
                });
            });
            setPosts(getPostsFromFirebase);
            setLoading(false);
        });
        return() => subscriber();
    },[loading]);

    if(loading){
        return <h1>Fetching data...</h1>
    }

    return (
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <section className="whu">
                <div className="details">
                    <h1>Details:</h1>
                    <div className="detailscontainer">
                        {posts.length > 0 ? (
                        posts.map((post)=> 
                        <div className="data" key={post.key}>
                        Name : {post.name}<br></br>
                        Address : {post.address}<br></br>
                        Query : {post.query}<br></br>
                        Phone : {post.phone}        
                        <button className="btn" onClick="">
                            <a href="tel:${post.phone}">Dial</a></button>
                        </div>
                         )                                               
                    ) : (
                        <h1>NO Data..</h1>
                    )}
                    </div>
                   
                </div>
            </section>

        </section>
    );

};

export default Hero;