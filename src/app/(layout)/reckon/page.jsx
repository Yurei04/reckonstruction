import Footer from "@/components/global/footer";
import NavBar from "@/components/global/navbar";
import ReckonMain from "@/pages/reckonStructPage/reckonMain";

export default function Reckon () {
    return (
        <div className="w-full min-h-screen p-0 m-0">
            <NavBar />
            <ReckonMain />
            <Footer />
        </div>
    )
}