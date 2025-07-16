import Footer from "@/components/global/footer";
import NavBar from "@/components/global/navbar";
import LibraryMain from "@/pages/libraryPage/librayMain";

export default function Library () {
    return (
        <div className="w-full min-h-screen">
            <NavBar />
            <LibraryMain />
            <Footer />
        </div>
    )
}