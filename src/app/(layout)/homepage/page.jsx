import Footer from "@/components/global/footer";
import NavBar from "@/components/global/navbar";
import HomepageMain from "@/pages/homepageSection/homepageMain";

export default function Homepage () {
    return (
        <div className="w-full min-h-screen p-0 m-0">
            <NavBar />
            <HomepageMain />
            <Footer />
        </div>
    )
}