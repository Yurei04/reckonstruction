import Footer from "@/components/global/footer";
import NavBar from "@/components/global/navbar";
import ProfileMain from "@/pages/profilePage/profileMain";

export default function Construct () {
    return (
        <div className="w-full min-h-screen p-0 m-0">
            <NavBar />
            <ProfileMain />
            <Footer />
        </div>
    )
}