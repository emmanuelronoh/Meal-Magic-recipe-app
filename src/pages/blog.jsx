/* eslint-disable react/jsx-pascal-case */
import Blog_cards from "../components/Blog_cards";
import Cardstest from "../components/Cardstest";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Blog = () => {
    return (
        <>
            <Navbar />
            <div style={{ width: "100%" }}>
            <Blog_cards />
                <Cardstest />
               
            </div>
            <Footer />
        </>
    );
}
 
export default Blog;